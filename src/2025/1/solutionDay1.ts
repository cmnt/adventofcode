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

    const result = puzzle.reduce((acc, curr) => {
      const isRight = curr.startsWith('R')
      const distance = Number(curr.slice(1))

      const newPointer = isRight ? (acc.pointer + distance) % 100 : (acc.pointer + 100 - distance) % 100
      const newCountZero = newPointer === 0 ? acc.countZero + 1 : acc.countZero
      return { pointer: newPointer, countZero: newCountZero }

    }, {
      pointer: 50,
      countZero: 0
    })

    return result.countZero
  }

  public solveSecond(): string | number {
    const puzzle = this.input.trim().split('\n')

    const result = puzzle.reduce(({ pointer: oldPointer, countZero: oldCountZero }, curr) => {
      const isRight = curr.startsWith('R')
      const distance = Number(curr.slice(1))

      const newPointer = isRight ? oldPointer + distance : oldPointer - distance
      const minPointer = Math.min(oldPointer, newPointer)
      const maxPointer = Math.max(oldPointer, newPointer)

      const firstMultiple = Math.floor(minPointer / 100) * 100 - 100
      const lastMultiple = Math.ceil(maxPointer / 100) * 100 + 100

      const isCrossingMultiple = (multiple: number) => {
        return (isRight && oldPointer < multiple && newPointer >= multiple) || (!isRight && oldPointer > multiple && newPointer <= multiple)
      }

      let revolutions = 0
      for (let multiple = firstMultiple; multiple < lastMultiple; multiple += 100) {
        if (isCrossingMultiple(multiple)) {
          revolutions += 1
        }
      }

      return { pointer: newPointer, countZero: oldCountZero + revolutions }

    }, {
      pointer: 50,
      countZero: 0
    })
    return result.countZero
  }

}
