resource "linode_database_postgresql" "foodle-db" {
  type      = "g6-nanode-1"
  label     = "foodle-database"
  region    = "eu-central"
  engine_id = "postgresql/14.4"
  encrypted = true

  updates {
    day_of_week   = "sunday"
    duration      = 2
    frequency     = "monthly"
    hour_of_day   = 22
    week_of_month = 1
  }
}

resource "linode_database_access_controls" "db-controll" {
  database_id   = linode_database_postgresql.foodle-db.id
  database_type = "postgresql"
  allow_list    = [linode_instance.foodle-backend.ip_address]
}
