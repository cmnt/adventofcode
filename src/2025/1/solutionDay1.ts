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

  public solveFirst(): string | number {
    const puzzle = this.input.trim().split('\n')
    console.log(puzzle)

    const result = puzzle.reduce((acc, curr) => {
      const isRight = curr.startsWith('R')
      const distance = Number(curr.slice(1))

      const newPointer = isRight ? (acc.pointer + distance) % 100 : (acc.pointer + 100 - distance) % 100
      // console.log(newPointer)
      const newCountZero = newPointer === 0 ? acc.countZero + 1 : acc.countZero
      return { pointer: newPointer, countZero: newCountZero }

    }, {
      pointer: 50,
      countZero: 0
    })

    return result.countZero
  }

  public solveSecond(): string | number {
    // WRITE SOLUTION 2
    return 'solution 2'
  }

}
