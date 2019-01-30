import { uuid, benchmark } from "./util"
import { User } from "./user"
import { NeoUser } from "./neo_user"
import { ConnectionOptions, createConnection, Repository } from "typeorm"
import { options } from "./db"
import { BenchmarkService } from "./bechmark_service"

async function main() {
  const connection = await createConnection(options)
  const userRepository = connection.getRepository(User)
  const benchmarkService = new BenchmarkService("user", userRepository, User, 100, 1000)
  for (let i = 0; i < 100000000; i += benchmarkService.largeBatchSize) {
    await benchmarkService.benchmarkCreateFind10(i)
  }
  await connection.close()
}

main().catch(console.error)
