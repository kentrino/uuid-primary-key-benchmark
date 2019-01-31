import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository } from "typeorm"

export const options: ConnectionOptions = {
  type: "mysql",
  database: "test",
  entities: [ User, NeoUser ],
  logging: false,
  password: process.env.DB_PASSWORD,
  username: "root",
  host: process.env.DB_HOST,
}
