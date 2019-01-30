import { uuid, benchmark } from "./util"
import { User } from "./user"
import { NeoUser } from "./neo_user"
import { ConnectionOptions, createConnection, Repository } from "typeorm"
import { options } from "./db"
import { BenchmarkService } from "./bechmark_service"

async function main() {
  const connection = await createConnection(options)
  const userRepository = connection.getRepository(User)
  const benchmarkService = new BenchmarkService("user", userRepository, User)
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
  await connection.close()
}

main().catch(console.error)
