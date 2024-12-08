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
    const { leftList, rightList } = initPuzzle(this.input)

    const sortedLeftList = leftList.toSorted()
    const sortedRightList = rightList.toSorted()

    const distance = sortedLeftList.reduce((sumDistance, left, index) => {
      const right = sortedRightList[index]
      return sumDistance + Math.abs(left - right)
    }, 0)

    return distance
  }

  public solveSecond(): number {
    const { leftList, rightList } = initPuzzle(this.input)

    const distance = leftList.reduce((sumDistance, left) => {
      const countRightOccurences = countNumberOccurrences(rightList, left)
      return sumDistance + left * countRightOccurences

    }, 0)

    return distance
  }

}

const initPuzzle = (input): { leftList: number[], rightList: number[] } => {
  const puzzleInput = input.trim().split('\n')
  const leftList = puzzleInput
    .map((line) => line.split(' ').at(0))
    .map(Number)
  const rightList = puzzleInput
    .map((line) => line.split(' ').at(-1))
    .map(Number)
  return { leftList, rightList }
}

const countNumberOccurrences = (list: number[], number: number): number =>
  list.reduce((count, current) => {
    return current === number ? count + 1 : count
  }, 0)
