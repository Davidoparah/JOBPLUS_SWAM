terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.36.0"
    }
  }
}
provider "digitalocean" {
  token = var.do_token
}
//copy over the public key to digitalocean
resource "digitalocean_ssh_key" "prod_ssh_key" {
  name   = "${var.app_name}-ssh-key"
  public_key = file("${var.ssh_key}.pub")
}

# Create a new Web Droplet in the nyc2 region
resource "digitalocean_droplet" "manager_node" {
  name     = "${var.app_name}-manager-droplet"
  image    = "${var.do_image}"
  region   = "${var.do_region}"
  size     = "${var.do_size}"
  ssh_keys = [var.ssh_fingerprint]

provisioner "remote-exec"{
  inline = [
  "sudo apt-get update",
  "sudo apt-get install -y software-properties-common",
  "sudo apt-get-repository --yes ppa:ansible/ansible",
  "sudo apt-get update",
  "sudo apt-get install -y ansible",
  ]

  connection {
    type            = "ssh"
    user            = "root"
    private_key     = file("${var.ssh_key}")
    host            = self.ipv4_address
  }
}


}

resource "digitalocean_droplet" "worker1_node" {
  name     = "${var.app_name}-worker1-droplet"
  image    = "${var.do_image}"
  region   = "${var.do_region}"
  size     = "${var.do_size}"
  ssh_keys = [var.ssh_fingerprint]

  provisioner "remote-exec"{
  inline = [
  "sudo apt-get update",
  "sudo apt-get install -y software-properties-common",
  "sudo apt-get-repository --yes ppa:ansible/ansible",
  "sudo apt-get update",
  "sudo apt-get install -y ansible",
  ]

  connection {
    type           = "ssh"
    user           = "root"
    private_key    = file("${var.ssh_key}")
    host           = self.ipv4_address
  }
}

}



  # By defining this resource, Terraform will reserve a Floating IP in the specified region.
  # This Floating IP can then be attached to a droplet, as defined in the subsequent 
  # manager_floating_ip_assignment resource. This ensures that even if the droplet is 
  # destroyed and re-created (due to changes in the infrastructure), the Floating IP can be 
  # re-attached to the new droplet, maintaining the same public IP address for accessing 
  # the services hosted on the droplet.

  # floating ip for manager
  resource "digitalocean_floating_ip" "manager_floating_ip" {
    region = "${var.do_region}"
  }

  resource "digitalocean_floating_ip_assignment" "manager_ip_assignment" {
    droplet_id = digitalocean_droplet.manager_node.id
    ip_address = digitalocean_floating_ip.manager_floating_ip.ip_address

    depends_on = [digitalocean_droplet.manager_node]
  }

  output "manager_floating_ip_address" {
    value       = digitalocean_floating_ip.manager_floating_ip.ip_address
    description = "The Floating IP address assigned to manager node."
  }

  # floating ip for worker1
  resource "digitalocean_floating_ip" "worker1_floating_ip" {
    region = "${var.do_region}"
  }

  resource "digitalocean_floating_ip_assignment" "worker1_ip_assignment" {
    droplet_id = digitalocean_droplet.worker1_node.id
    ip_address = digitalocean_floating_ip.worker1_floating_ip.ip_address

    depends_on = [digitalocean_droplet.worker1_node]
  }

  output "worker1_floating_ip_address" {
    value       = digitalocean_floating_ip.worker1_floating_ip.ip_address
    description = "The Floating IP address assigned to worker1 node."
  }


data "template_file" "ansible_inventory" {
  template = file("${path.module}/templates/inventory.tpl")

  vars = {
    manager_ip         = digitalocean_floating_ip.manager_floating_ip.ip_address
    worker_ip          = digitalocean_floating_ip.worker1_floating_ip.ip_address
    ssh_private_key    = "/Users/mujimoyen/.ssh/job_plus_ed25519"
  }
}

# Use local-exec to write the rendered template to a file
resource "null_resource" "ansible_inventory" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "echo '${data.template_file.ansible_inventory.rendered}' > ../ansible/inventory.ini"

  }

  depends_on = [
    digitalocean_floating_ip.manager_floating_ip,
    digitalocean_floating_ip.worker1_floating_ip,
  ]
}
