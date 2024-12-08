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

  public solveFirst(a = initPuzzle(this.input)): number {
    const reports = a

    const isSafeReport = (levels: number[], maxDifference: number): boolean => {
      const increasingWithmaxStep = (numbers: number[]) => numbers
        .every((num, i) => i === 0 || (num > numbers[i - 1] && num - numbers[i - 1] <= maxDifference))

      return increasingWithmaxStep(levels) || increasingWithmaxStep(levels.reverse())
    }

    const countSafeReports = reports
      .reduce((count, levels) => isSafeReport(levels, 3) ? count + 1 : count, 0)

    return countSafeReports
  }

  public solveSecond(): number {
    const reports = initPuzzle(this.input)

    const isSafeReport = (levels: number[], maxDifference: number): boolean => {
      const increasingWithmaxStepAndTolerateBadLevel = (numbers: number[]) => numbers
        .reduce((acc, num, i) => {
          const { indexBadLevel, isSafe } = acc
          if (!isSafe || i === 0) return acc

          if (i === 1) {
            if (isGoodLevel(num, numbers[i - 1], maxDifference) && isGoodLevel(numbers[i + 1], num, maxDifference)) return acc
            if (isGoodLevel(numbers[i + 1], num, maxDifference)) return { ...acc, indexBadLevel: 0 }
            if (isGoodLevel(numbers[i + 1], numbers[i - 1], maxDifference)) return { ...acc, indexBadLevel: 1 }

            if (isGoodLevel(num, numbers[i - 1], maxDifference)) return acc
            return { ...acc, isSafe: false }
          }

          if (indexBadLevel === i - 1) {
            if (isGoodLevel(num, numbers[i - 2], maxDifference)) return acc
            return { ...acc, isSafe: false }
          }

          const isGoodCurrentLevel = isGoodLevel(num, numbers[i - 1], maxDifference)
          if (isGoodCurrentLevel) return acc

          return { isSafe: indexBadLevel === undefined, indexBadLevel: i }
        }, {
          indexBadLevel: undefined as number | undefined,
          isSafe: true
        })
        .isSafe

      return increasingWithmaxStepAndTolerateBadLevel(levels) || increasingWithmaxStepAndTolerateBadLevel(levels.reverse())
    }
    const countSafeReports = reports.
      reduce((count, levels) => isSafeReport(levels, 3) ? count + 1 : count, 0)

    return countSafeReports
  }

}

const initPuzzle = (input): number[][] => {
  const puzzleInput = input.trim().split('\n')
  return puzzleInput
    .map((line) => line.split(' ').map(Number))
}

const isGoodLevel = (first, second, maxDifference) => (first > second) && ((first - second) <= maxDifference)

