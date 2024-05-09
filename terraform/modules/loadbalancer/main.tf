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

resource "digitalocean_loadbalancer" "app_lb" {
  name   = "${var.app_name}-lb"
  region = "${var.do_region}"
  droplet_ids = var.droplet_ids

  forwarding_rule {
    entry_port     = 80
    entry_protocol = "http"

    target_port     = 80
    target_protocol = "http"
  }

  healthcheck {
    port     = 80
    protocol = "tcp"
  }
}  

