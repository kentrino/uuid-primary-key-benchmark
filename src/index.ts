import { uuid, benchmark } from "./util"
import { User } from "./user"
import { ConnectionOptions, createConnection, Repository } from "typeorm"
import { options } from "./db"

async function createUser(i: number, repository: Repository<User>): Promise<User> {
  const user = new User(i)
  await repository.save(user)
  return user
}

async function getUserById(ids: string[], repository: Repository<User>): Promise<User[]> {
  const users = await repository.findByIds(ids)
  return users
}

async function benchmarkCreateFind10(start: number, repository: Repository<User>) {
  const thousandUsers: User[] = []
  for (let i = start; i < start + 10000; i += 1000) {
    await benchmark("create", async () => {
      const users: User[] = []
      for (let j = i; j < i + 1000; ++j) {
        const user = new User(j)
        users.push(user)
        thousandUsers.push(user)
      }
      await repository.save(users)
    })
  }
  const ids = thousandUsers.map((u) => u.id)
  await benchmark("find10", async () => {
    await getUserById(ids, repository)
  })
}

async function main() {
  const connection = await createConnection(options)
  const userRepository = connection.getRepository(User)
  for (let i = 0; i < 100000000; i += 10000) {
    await benchmarkCreateFind10(i, userRepository)
  }
  await connection.close()
}

main().catch(console.error)
