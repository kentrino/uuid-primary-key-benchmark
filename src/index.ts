import { uuid, benchmark } from "./util"
import { User } from "./User"
import { NeoUser } from "./NeoUser"
import { ConnectionOptions, createConnection, Repository, Connection } from "typeorm"
import { options } from "./db"
import { BenchmarkService } from "./BenchmarkService"
import { Constructable } from "./Constructable"
import { ArgumentParser } from "argparse"

async function runBenchmark(connection: Connection, tableName: string, model: Constructable<User | NeoUser>) {
  const userRepository = connection.getRepository(model)
  const benchmarkService = new BenchmarkService(tableName, userRepository, model)
  const count = (await userRepository.query(`select count(*) as cnt from ${tableName}`))[0] as {cnt: string}
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
  const args = parseArgs()
  const connection = await createConnection(options)
  if (args.table === "users") {
    await runBenchmark(connection, "users", User)
  } else {
    await runBenchmark(connection, "neo_users", NeoUser)
  }
  await connection.close()
}

type Args = {
  table: "users" | "neo_users",
}

function parseArgs(): Args {
  const parser = new ArgumentParser({
    addHelp: true,
    description: "mysql benchmark",
  })
  parser.addArgument(
    [ "-t", "--table" ],
    {
      help: "table name",
    },
  )
  const args = parser.parseArgs()
  if (args.table !== "users" && args.table !== "neo_users") {
    throw Error("You must specify table name correctly.")
  }
  return args
}

main().catch(console.error)
