resource "linode_firewall" "firewall" {
  label           = "basic_firewall"
  inbound_policy  = "DROP"
  outbound_policy = "DROP"

  inbound {
    label    = "a_https_in"
    action   = "ACCEPT"
    ports    = "443"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }
  inbound {
    label    = "a_ssl_in"
    action   = "ACCEPT"
    ports    = "443"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }

  inbound {
    label    = "a_ssh_in"
    action   = "ACCEPT"
    ports    = "22"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }
  outbound {
    label    = "a_dns_out"
    action   = "ACCEPT"
    ports    = "53"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }

  outbound {
    label    = "a_ssh_out"
    action   = "ACCEPT"
    ports    = "22"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }

  outbound {
    label    = "a_ssl_out"
    action   = "ACCEPT"
    ports    = "443"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }
  outbound {
    label    = "a_postgresql_out"
    action   = "ACCEPT"
    ports    = "5432"
    protocol = "TCP"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }
  linodes = [linode_instance.foodle-backend.id]


}
