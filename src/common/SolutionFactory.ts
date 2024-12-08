import Solution from '@/common/types/Solution'
import { readFile } from 'fs/promises'

class SolutionFactory {
  public async getPuzzle(year: number, day: number) {
    let input = ''
    try {
      input = await readFile(`./src/${year}/${day}/input.txt`, { encoding: 'utf8' })
    } catch (error) {
      console.error(error)
      process.exit(1)
    }

    const solutionModule: { default: { new(): Solution } } = await import(
      `@/${year}/${day}/solutionDay${day}`
    )

    const { default: solutionClass } = solutionModule
    const solution = new solutionClass()
    solution.setInput(input)
    return solution
  }
}

export default new SolutionFactory()
