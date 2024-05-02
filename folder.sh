
#!/bin/bash

mkdir -p ansible/playbooks &&

mv ansible/manager_playbook.yml ansible/playbooks/ &&
mv ansible/worker_playbook.yml ansible/playbooks/ &&

rm ansible/gluster_playbook.yml &&
rm ansible/servers_playbook.yml &&

mkdir -p ansible/roles/gluster_install/tasks &&
touch ansible/roles/gluster_install/tasks/main.yml &&

mkdir -p ansible/roles/gluster_shared_volume/tasks &&
touch ansible/roles/gluster_shared_volume/tasks/main.yml &&

mkdir -p ansible/roles/gluster_mount_volume/tasks &&
touch ansible/roles/gluster_mount_volume/tasks/main.yml &&


touch ansible/site.yml

