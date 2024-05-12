module "digitalocean_ssh_key" {
  source = "./modules/digitalocean_ssh_key"
  
  app_name = var.app_name
  ssh_key = var.ssh_key
  do_token = var.do_token
}

module "droplets" {
  source = "./modules/droplets"
  app_name = var.app_name
  do_image = var.do_image
  do_size = var.do_size
  do_region = var.do_region
  ssh_fingerprint =var.ssh_fingerprint
  ssh_key = var.ssh_key
  do_token = var.do_token
}

module "floating_ips" {
  source = "./modules/floating_ips"
  do_region = var.do_region
  do_token = var.do_token
  droplet_details = module.droplets.droplet_details
}

module "loadbalancer" {
  source = "./modules/loadbalancer"

  app_name = var.app_name
  do_region = var.do_region
  do_token = var.do_token
  droplet_ids = [for _, details in module.droplets.droplet_details : details.id]
} 

module "ansible_setup" {
  source = "./modules/ansible_setup"
  do_token = var.do_token
  floating_ip_details = module.floating_ips.floating_ip_details
  ssh_private_key_path = "/Users/mujimoyen/.ssh/job_plus_ed25519"
  lb_ip = module.loadbalancer.lb_ip
}

