
variable "do_token" {
  description = "DigitalOcean API token"
  type = string
  sensitive = true
}

variable "ssh_fingerprint" {
  description = "SSH Key fingerprint"
  type = string
  sensitive =true
}

variable "ssh_key" {
  description = "Public SSH key path"
  type = string
  sensitive = true
  
}

variable "do_region" {
  description = "DigitalOcean region"
  type = string
}

variable "do_image" {
  description = "DigitalOcean image"
  type = string
}

variable "do_size" {
  description = "DigitalOcean droplet size"
  type = string  
}

variable "app_name" {
  description = "Application name"
  type = string
}

variable "email" {
  description = "Email address"
  type = string  
}


