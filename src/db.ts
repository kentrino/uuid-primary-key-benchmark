import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository } from "typeorm"

export const options: ConnectionOptions = {
  type: "mysql",
  database: "test",
  entities: [ User, NeoUser ],
  logging: false,
  password: "test",
  username: "root",
  host: "127.0.0.1",
}
