variable "linodeAuthKey" {
  type        = string
  description = "Linode Api Keys"
  sensitive   = true
}
variable "rootPass" {
  type        = string
  description = "Password for root user"
  sensitive   = true
}

variable "authorized_key" {
  type        = string
  description = "A (public) ssh key for the root user account"
  sensitive   = true
}
