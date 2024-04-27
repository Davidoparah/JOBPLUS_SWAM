Docker text

## docker

Docker is a platform for developing, shipping, and running applications in containers, offering a lightweight alternative to traditional VMs.

## docker image

A Docker image is a lightweight, standalone, executable package that includes everything needed to run a piece of software, created from a Dockerfile.

## Dockerfile

A Dockerfile is a script containing a series of instructions for building a Docker image.

## Docker compose

Docker Compose is used to define and run multi-container Docker applications, using a YAML file to configure the application's services.

## Docker Volumes

Docker Volumes are designated areas for storing data outside containers, ensuring data persists beyond container lifecycles.

## Docker Networks

Docker networking allows containers to communicate with each other and the outside world via bridge, host, overlay, and macvlan networks.

Architecture: Docker Swarm utilizes a decentralized design that includes multiple Docker hosts and considers one of them as the manager node, responsible for orchestrating and scheduling containers on worker nodes. This design enhances fault tolerance and scalability.

Service Discovery: Swarm provides built-in service discovery and networking features, allowing containers to communicate with each other across multiple Docker hosts without the need for additional bridging or configuration. This simplifies the deployment of complex, multi-container apps.

Load Balancing: Docker Swarm includes a built-in load balancer that distributes incoming requests to services across the cluster, ensuring optimal resource utilization and responsiveness.

Scaling: Services can be scaled up or down seamlessly within a Docker Swarm cluster based on demand, with the Swarm manager automatically adjusting the number of replicas to meet the desired state.

Rolling Updates and Rollbacks: Swarm supports rolling updates, allowing users to update the version of the application services gradually without downtime. In case of any issue, it also facilitates easy rollback to a previous version.

Security: Docker Swarm supports mutual TLS for node authentication, providing a secure way to manage the cluster. It ensures that all communication within the Swarm is encrypted and authenticated, safeguarding against unauthorized access.

## Role in GlusterFS:

# Physical vs. Logical:

/data/bricks/shared_storage

---

is where the data is physically stored on each node as part of the GlusterFS volume.

## /mnt/shared_storage

represents the logical aspect of accessing the distributed data, regardless of where the data physically resides.

# Saving/Accessing Data in a GlusterFS Volume

## Data Written to the Mount Point

When you write data, you do so through the GlusterFS volume's mount point (/mnt/shared_storage in this case), not directly to the brick locations.

Then depending on the configuration ( distributed/replicated/striped ) GlusterFS decides how to store the data across the various bricks in the volume.

## Data Distribution/Replication

In our example we used a replicated approach which ensures that copies of the data are stored on multiple bricks across different nodes to provide redundancy.

- name: Create GlusterFS volume named shared_storage
  command: >
  gluster volume create shared_storage replica {{ replica_count }}
  {% for host in groups['gluster_nodes'] %}
  {{ host }}:/data/bricks/shared_storage
  {% endfor %}
  force

## Accessing the Data

When accessing the data, you interact with the mount point (/mnt/shared_storage). The GlusterFS client handles fetching the data from wherever it resides in the cluster, abstracting the physical storage details.

## create playbook

touch ansible/gluster_playbook.yml

## gluster_playbook.yml

# gluster_playbook.yml

# GlusterFS is a scalable, distributed file system that aggregates disk storage

# resources from multiple servers into a single global namespace. It's designed

# to handle large amounts of data and provide high-availability and performance.

# GlusterFS works by linking together multiple storage bricks over a network to create

# a unified file system. Each brick is a standard file system directory, and GlusterFS

# uses a client-server model where data is stored on servers but accessible from any

# client connected to the network.

# This setup allows for easy scaling, as new storage

# bricks can be added to the cluster without disrupting service. GlusterFS is ideal

# for cloud computing, streaming media services, and content delivery networks due to

# its flexibility and performance.

---

- name: GlusterFS Install & Setup
  hosts: servers
  become: yes
  tasks:

  - name: Install software-properties-common
    apt:
    name: software-properties-common
    state: latest
    tags:

    - proper_common

  - name: Add GlusterFS PPA
    apt_repository:
    repo: ppa:gluster/glusterfs-11
    update_cache: yes
    tags:

    - add_glusterfs_ppa

  - name: Install GlusterFS server
    apt:
    name: glusterfs-server
    state: latest
    tags:

    - install_glusterfs

  - name: Start GlusterFS service
    systemd:
    name: glusterd
    state: started
    enabled: yes
    tags:

    - start_glusterd

  - name: Enable GlusterFS service to start on boot
    systemd:
    name: glusterd
    enabled: yes
    tags:

    - enable_glusterd

  - name: Check GlusterFS service status
    command: systemctl status glusterd
    register: glusterd_status
    tags:

    - status_glusterd

  - name: Display GlusterFS service status
    debug:
    var: gluster_status.stdout_lines
    tags:

    - status_glusterd

  - name: Set hostname to match inventory name
    hostname:
    name: "{{ inventory_hostname }}"
    when: inventory_hostname in group ['servers']
    tags:

    - set_hostname

  - name: Update /etc/hosts with localhost
    lineinfile:
    path: /etc/hosts
    line: "127.0.0.1 {{inventory_hostname}}"
    regexp: '^127\.0\.0\.1 {{ inventory_hostname }}'
    state: present
    tags:

    - update_hosts_local

  - name: Update /etc/hosts with node IP and name
    lineinfile:
    path: /etc/hosts
    line: "{{hostvars[item].ansible_host }} {{ item }}"
    regexp: "^{{ hostvars[item].ansible_host }} {{ item }}"
    state: present
    loop: "{{ group [' servers '] }}"
    when: hostvars[item].ansible_host is defined
    tags:

    - update_hosts_other

  - name: Create shared storage brick directory
    file:
    path: /data/bricks/shared_storage
    state: directory
    owner: root
    group: root
    mode: 0755
    tags:

    - create_brick_dir

  - name: Create mount point for shared storage
    file:
    path: /mnt/shared_storage
    state: directory
    owner: root
    group: root
    mode: 0755
    tags:

    - create_mount_point

  - name: Get Gluster peer status
    command: gluster peer status
    register: gluster_peer_status
    ignore_errors: yes
    tags: -get_peer_status

  - name: Set fact exiting peers hotnames
    set_fact:
    exiting_peers_hostname: " {{ gluster_peer_status.stdout | regex_findall ('Hostname: (\\S+)') }}"
    when: gluster_peer_status.rc == 0
    tags:

    - set_peer_fact

  - name: Probe other peers to form a trusted pool
    gluster.gluster.gluster_peer:
    state: present
    nodes: " {{ (inventory_hostname == groups['servers'] [0] and 'localhost' in (existing_peers_hostname | default([]))) | ternary (' localhost ' + item, item) }}"
    loop: "{{ groups['servers'] }}"
    when:
    - inventory_hostname != item
    - item not in existing_peers_hostnames
      tags:
    - probe_peers
