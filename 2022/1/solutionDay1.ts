import ISolution from '../../common/types/Solution';

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
    const puzzle = ConcretePuzzle.formatToArray(this.input, 'int')
    const res = Math.max(...getSum(puzzle))
    return res;
  }

  public solveSecond(): string | number {
    const puzzle = ConcretePuzzle.formatToArray(this.input, 'int')

    const res = getSum(puzzle).sort((a,b) => a - b).slice(-3).reduce((acc, curr) => acc + curr, 0)
    return res;  }

}

const getSum = (arr) => {
    return arr.reduce((acc, curr, index) => {
        if (Number.isNaN(curr)) {
            return [...acc, 0]
        }
        const lastIndex = acc.length - 1
        acc[lastIndex] =  acc[lastIndex] + curr 
        return acc
    }, [])
}
