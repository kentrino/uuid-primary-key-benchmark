import * as uuidv5 from "uuid/v5"
import * as util from "util"
import { dataDir } from "./paths"
import * as fs from "fs"
import * as path from "path"

const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341"

export function uuid(i: number, prefix: string): string {
  return uuidv5(`${prefix}${i}${new Date()}${process.hrtime()[1]}`, NAMESPACE)
}

function calcMilliseconds(time: number[]): number {
  return time[0] * 1000 + time[1] / (1000 * 1000)
}

const asyncFileAppend = util.promisify(fs.appendFile)

export type BenchmarkOption = {
  filename: string,
  i: number
}

export async function benchmark(opt: BenchmarkOption, func: () => Promise<void>) {
  const file = path.join(dataDir, `${opt.filename}.dat`)
  const start = process.hrtime()
  await func()
  const end = process.hrtime(start)
  const ms = calcMilliseconds(end)
  await asyncFileAppend(file, `${opt.i}: ${ms}\n`)
}
