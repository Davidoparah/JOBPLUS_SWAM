output "droplet_details" {
  value = {for key, droplet in digitalocean_droplet.node : key => {
    id = droplet.id,
    role = var.nodes[key].role
  }}
  description = "Map of droplet names to their IDs and roles"
}
