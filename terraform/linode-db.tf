resource "linode_database_postgresql" "foodle-db" {
  type      = "g6-nanode-1"
  label     = "db"
  region    = "eu-central"
  engine_id = "postgresql/15.0"
  encrypted = true

  updates {
    day_of_week   = "sunday"
    duration      = 2
    frequency     = "monthly"
    hour_of_day   = 22
    week_of_month = 1
  }
}
