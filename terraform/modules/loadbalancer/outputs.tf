output "lb_ip" {
  value = digitalocean_loadbalancer.app_lb.ip
  description = "The IP address of the load balancer."
}