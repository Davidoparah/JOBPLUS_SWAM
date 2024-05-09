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

// copies over the public key to digitalocean
resource "digitalocean_ssh_key" "prod_ssh_key" {
  name       = "${var.app_name}-ssh-key"
  public_key = file("${var.ssh_key}.pub")
}