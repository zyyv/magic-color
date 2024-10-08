import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const AimPaths = [
  '../packages/core',
  '../packages/magic-color',
  '../packages/vue',
]

const AimFiles = [
  '../README.md',
]

async function sync(file: string, excludes: string[] = []) {
  const filterPaths = AimPaths.filter(path => !excludes.includes(path))

  const filePath = path.resolve(__dirname, file)
  const fileName = path.basename(filePath)
  const content = await fs.readFile(filePath, 'utf-8')

  for (const p of filterPaths) {
    const target = path.resolve(__dirname, p, fileName)
    await fs.writeFile(target, content)
  }
}

async function main() {
  for (const file of AimFiles)
    await sync(file)
}

main()
