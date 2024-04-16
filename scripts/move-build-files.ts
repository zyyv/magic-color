import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const targetPath = path.resolve(__dirname, '../dist/play')

async function moveBuildFiles(dirPath: string, depth = 0) {
  let files = await fs.readdir(dirPath)

  if (depth === 0)
    files = files.filter(file => file !== 'talk')

  for (const file of files) {
    const p = path.resolve(dirPath, file)
    const isDir = (await fs.stat(p)).isDirectory()

    if (isDir) {
      await moveBuildFiles(p, depth + 1)
      await fs.rmdir(p)
    }
    else {
      const targetDirPath = dirPath.replace('dist', 'dist/play')
      await ensureTargetDirExists(targetDirPath)
      await fs.rename(p, path.resolve(targetDirPath, file))
    }
  }
}

async function ensureTargetDirExists(p: string) {
  // 如果没有目标目录，就创建一个
  try {
    await fs.access(p)
  }
  catch {
    await fs.mkdir(p)
  }
}

async function main() {
  await ensureTargetDirExists(targetPath)
  await moveBuildFiles(path.resolve(__dirname, '../dist'))
}

main()
