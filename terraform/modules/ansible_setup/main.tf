
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      #version = "latest" 
      version = "~> 2.36.0" 
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

locals {
  managers = [for key, value in var.floating_ip_details : "${key} ansible_host=${value.floating_ip} ansible_ssh_user=root ansible_ssh_private_key_file=${var.ssh_private_key_path}" if value.role == "manager"]
  workers = [for key, value in var.floating_ip_details : "${key} ansible_host=${value.floating_ip} ansible_ssh_user=root ansible_ssh_private_key_file=${var.ssh_private_key_path}" if value.role == "worker"]
}

# Data source to render the template
data "template_file" "inventory" {
  template = file("${path.module}/../../templates/inventory.tpl")

  vars = {
    managers = join("\n", local.managers)
    workers = join("\n", local.workers)
    lb_ip = var.lb_ip
  }
}

# Use local-exec to write the rendered template to a file
resource "null_resource" "ansible_inventory" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "echo '${data.template_file.inventory.rendered}' > ../ansible/inventory.ini"
  }
}
