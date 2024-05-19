
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

resource "digitalocean_floating_ip" "floating_ip" {
  for_each = var.droplet_details
  region   = var.do_region
}

resource "digitalocean_floating_ip_assignment" "ip_assignment" {
  for_each = digitalocean_floating_ip.floating_ip
  droplet_id = var.droplet_details[each.key].id
  ip_address = each.value.ip_address
  #ip_address = digitalocean_floating_ip.floating_ip[each.key].ip_address
} 
