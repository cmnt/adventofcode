import ISolution from '@/common/types/Solution'

/**
 * @class ConcretePuzzle
 * @description 
 * attribute herited from ISolution:
 * - input: string
 * 
 * methods herited from ISolution:
 * - display(): void
 * - static formatToArray(input, type): Array<string | number>
 * 
**/

export default class ConcretePuzzle extends ISolution {

  public solveFirst(): number {
    const reports = initPuzzle(this.input)

    const countSafeReports = reports.reduce((count, levels) => isSafeReport(levels, 3) ? count + 1 : count
      , 0)

    return countSafeReports
  }

  public solveSecond(): number {
    // WRITE SOLUTION 2
    return 0
  }

}

const initPuzzle = (input): number[][] => {
  const puzzleInput = input.split('\n')
  return puzzleInput
    .map((line) => line.split(' ').map(Number))
}

const isSafeReport = (numbers: number[], maxDifference: number): boolean => {
  const increasingWithmaxStep = numbers.every((num, i) => i === 0 || (num > numbers[i - 1] && num - numbers[i - 1] <= maxDifference))
  const decreasingWithMaxStep = numbers.every((num, i) => i === 0 || (num < numbers[i - 1] && numbers[i - 1] - num <= maxDifference))
  console.log(increasingWithmaxStep, decreasingWithMaxStep)
  return increasingWithmaxStep || decreasingWithMaxStep
}
