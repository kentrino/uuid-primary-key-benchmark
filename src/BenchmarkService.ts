import { uuid, benchmark } from "./util"
import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository, ObjectLiteral, DeepPartial } from "typeorm"
import { options } from "./db"
import { Constructable } from "./Constructable"

type Id = string | number

export class BenchmarkService<T extends NeoUser | User> {
  constructor(
    private prefix: string,
    private repository: Repository<T>,
    private factory: Constructable<T>,
    private smallBachSize: number,
    public largeBatchSize: number,
  ) {}

  async createUser(i: number, repository: Repository<T>): Promise<T> {
    const user = new this.factory(i)
    await repository.save(user as any)
    return user
  }

  async getUserById(ids: Id[], repository: Repository<T>): Promise<T[]> {
    const users = await repository.findByIds(ids)
    return users as T[]
  }

  async benchmarkCreateFind10(start: number) {
    const thousandUsers: T[] = []
    for (let i = start; i < start + this.largeBatchSize; i += this.smallBachSize) {
      await benchmark({
        filename: `${this.prefix}_create_${this.smallBachSize}`,
        i: i,
      }, async () => {
        const users: T[] = []
        for (let j = i; j < i + this.smallBachSize; ++j) {
          const user = new this.factory(j) as T
          users.push(user)
          thousandUsers.push(user)
        }
        await this.repository.save(users as any)
      })
    }
    const ids = thousandUsers.map((u) => u.id)
    await benchmark({
      filename: `${this.prefix}_find_${this.largeBatchSize}`,
      i: start,
    }, async () => {
      await this.getUserById(ids, this.repository)
    })
  }
}
