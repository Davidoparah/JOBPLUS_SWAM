terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.36.0"
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
}

resource "digitalocean_droplet" "worker1_node" {
  name     = "${var.app_name}-worker1-droplet"
  image    = "${var.do_image}"
  region   = "${var.do_region}"
  size     = "${var.do_size}"
  ssh_keys = [var.ssh_fingerprint]
}
