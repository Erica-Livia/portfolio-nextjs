# andasy.hcl app configuration file generated for myptf on Wednesday, 06-Aug-25 14:53:00 CAT
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "myptf"

app {

  env = {
  HOST = "::"
  }

  port = 3000

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "myptf"
  }

}
