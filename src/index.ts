import { uuid, benchmark } from "./util"
import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository, Connection } from "typeorm"
import { options } from "./db"
import { BenchmarkService } from "./BenchmarkService"
import { Constructable } from "./Constructable"

async function runBenchmark(connection: Connection, prefix: string, model: Constructable<User | NeoUser>) {
  const userRepository = connection.getRepository(model)
  const benchmarkService = new BenchmarkService(prefix, userRepository, model, 100, 1000)
  const count = (await userRepository.query(`select count(*) as cnt from users`))[0] as {cnt: string}
  const start = parseInt(count.cnt)
  for (let i = start; i < 100000000; i += benchmarkService.largeBatchSize) {
    await benchmarkService.benchmarkCreateFind10(i)
  }
}

async function main() {
  const connection = await createConnection(options)
  await runBenchmark(connection, "user", User)
  await connection.close()
}

main().catch(console.error)
