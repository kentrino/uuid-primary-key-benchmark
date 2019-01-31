import { User } from "./User"
import { ConnectionOptions, createConnection, Repository } from "typeorm"

export const options: ConnectionOptions = {
  type: "mysql",
  database: "test",
  entities: [ User ],
  logging: false,
  password: "test",
  username: "root",
  host: "127.0.0.1",
}
