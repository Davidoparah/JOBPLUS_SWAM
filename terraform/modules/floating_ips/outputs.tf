output "floating_ip_details" {
  value = { for key, ip in digitalocean_floating_ip.floating_ip : key => {
    floating_ip = ip.ip_address,
    droplet_id = var.droplet_details[key].id,
    role = var.droplet_details[key].role
  }}
}