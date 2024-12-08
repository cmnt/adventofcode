import fs from 'fs/promises'
import path from 'path'
import { fetchInput } from '@/common/input'
import SolutionFactory from '@/common/SolutionFactory'

export const computeSolution = async (year: number, day: number): Promise<void> => {
  await initData(year, day)
  await execute(year, day)
}


// Init directory and files
const initData = async (year: number, day: number) => {
  const dayDir = path.resolve(`./src/${year}/${day}`)
  const solutionFilePath = path.resolve(`${dayDir}/solutionDay${day}.ts`)
  const inputFilePath = path.resolve(`${dayDir}/input.txt`)
  const templateFilePath = path.resolve('./src/common/template/solution-template.ts')

  await createDirIfNotExists(dayDir)
  await copyFileIfNotExists(templateFilePath, solutionFilePath)
  await writeFileIfNotExists(inputFilePath, () => fetchInput(year, day))
}

const createDirIfNotExists = async (dirPath: string) => {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

const copyFileIfNotExists = async (src: string, dest: string) => {
  try {
    await fs.access(dest)
  } catch {
    await fs.copyFile(src, dest)
    console.log(`${dest} was copied to destination`)
  }
}

const writeFileIfNotExists = async (filePath: string, contentProvider: () => Promise<string>) => {
  try {
    await fs.access(filePath)
  } catch {
    const content = await contentProvider()
    await fs.writeFile(filePath, content)
  }
}

// Execute solution
const execute = async (year, day) => {
  const puzzle = await SolutionFactory.getPuzzle(year, day)
  console.log('puzzle done')

  console.log(puzzle.display())
}

