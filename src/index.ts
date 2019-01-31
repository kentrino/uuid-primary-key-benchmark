import { uuid, benchmark } from "./util"
import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository, Connection } from "typeorm"
import { options } from "./db"
import { BenchmarkService } from "./BenchmarkService"
import { Constructable } from "./Constructable"

async function runBenchmark(connection: Connection, prefix: string, model: Constructable<User | NeoUser>) {
  const userRepository = connection.getRepository(model)
  const benchmarkService = new BenchmarkService(prefix, userRepository, model)
  const count = (await userRepository.query(`select count(*) as cnt from users`))[0] as {cnt: string}
  const start = parseInt(count.cnt, 10)
  let smallBatchSize = 1000
  let largeBatchSize = smallBatchSize * 10
  for (let i = start; i < 100000000; i += largeBatchSize) {
    await benchmarkService.benchmarkCreateFind10(i, largeBatchSize, smallBatchSize)
    if (Math.floor(Math.random() * 5) === 0) {
      smallBatchSize = 10
    } else {
      smallBatchSize = 1000
    }
    largeBatchSize = smallBatchSize * 10
  }
}

async function main() {
  const connection = await createConnection(options)
  const userBenchmarkPromise = runBenchmark(connection, "user", User)
  const neoUserBenchmarkPromise = runBenchmark(connection, "neo_user", NeoUser)
  await Promise.all([userBenchmarkPromise, neoUserBenchmarkPromise])
  await connection.close()
}

main().catch(console.error)
