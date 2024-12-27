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
    const { orderingRules, updates } = decodeInput(this.input)
    return updates
      .filter(update => isCorrectUpdate(orderingRules, update))
      .map(getMiddle)
      .reduce(sum, 0)
  }

  public solveSecond(): number {
    const { orderingRules, updates } = decodeInput(this.input)
    return updates
      .filter(update => !isCorrectUpdate(orderingRules, update))
      .map(update => rectifyOrder(orderingRules, update))
      .map(getMiddle)
      .reduce(sum, 0)
  }
}

const decodeInput = (input: string) => {
  const puzzle = input.split('\n')
  const limit = puzzle.findIndex(a => a === '')
  const orderingRules = puzzle.slice(0, limit).map(a => a.split('|').map(Number))
  const updates = puzzle.slice(limit + 1).map(a => a.split(',').map(Number))
  return { orderingRules, updates }
}

const isCorrectUpdate = (orderingRules: number[][], update: number[]) =>
  update.every((pageNumber, index, array) => isCorrectPageNumber(orderingRules, pageNumber, array.slice(0, index)))

const isCorrectPageNumber = (orderingRules: number[][], pageNumber: number, previousPageNumbers: number[]) => {
  const shouldBeAfterPageNumbers = orderingRules.filter(rule => rule[0] === pageNumber).map(a => a[1])
  return previousPageNumbers.every(previousPageNumber => !shouldBeAfterPageNumbers.includes(previousPageNumber))
}

const getMiddle = (array: number[]) => array[Math.floor(array.length / 2)]
const sum = (a: number, b: number) => a + b

const rectifyOrder = (orderingRules: number[][], update: number[]) => {
  for (let i = 0; i < update.length; i++) {
    const pageNumber = update[i]
    const previousPageNumbers = update.slice(0, i)
    const shouldBeAfterPageNumbers = orderingRules.filter(rule => rule[0] === pageNumber).map(a => a[1])
    const firstIncorrectPageNumberIndex = previousPageNumbers.findIndex(previousPageNumber => shouldBeAfterPageNumbers.includes(previousPageNumber))

    if (firstIncorrectPageNumberIndex === -1) {
      continue
    }
    return rectifyOrder(orderingRules, swap(update, i, firstIncorrectPageNumberIndex))
  }
  return update
}

const swap = (array: number[], i: number, j: number) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
  return array
}
