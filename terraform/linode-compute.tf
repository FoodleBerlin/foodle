terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.29.3"
    }
  }
}
provider "linode" {
  token = var.linodeAuthKey
}
resource "linode_instance" "foodle-backend" {
  region          = "eu-central"
  image           = "linode/ubuntu22.04"
  type            = "g6-nanode-1"
  root_pass       = var.rootPass
  authorized_keys = [var.authorized_key]
  group           = "backend"
  label           = "foodle-backend"
  stackscript_id  = 1081638


  tags = ["backend", "foodle", "monolith"]

  alerts {
    cpu         = 90
    network_in  = 500
    network_out = 500
  }

}
