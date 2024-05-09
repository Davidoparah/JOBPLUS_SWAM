output "ssh_key_fingerprint" {
  value       = digitalocean_ssh_key.prod_ssh_key.fingerprint
  description = "The fingerprint of the SSH key created."
}
