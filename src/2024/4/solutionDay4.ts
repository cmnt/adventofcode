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
    const matrix = this.input.trim().split('\n').map(a => a.split(''))

    const countXmas = (matrix: string[][], x: number, y: number): number => {
      if (matrix[y][x] !== 'X') return 0

      const increments = [[1, 0], [0, 1], [1, 1], [1, -1], [-1, 0], [0, -1], [-1, -1], [-1, 1]]

      const count = increments.reduce((acc, [xInc, yInc]) => {
        if (isXmas(matrix, x, y, xInc, yInc)) {
          return acc + 1
        }
        return acc
      }, 0)

      return count
    }

    const isXmas = (matrix: string[][], x: number, y: number, xInc: number, yInc: number): boolean => {
      if (x + xInc * 3 < 0 || x + xInc * 3 >= matrix[0].length) return false
      if (y + yInc * 3 < 0 || y + yInc * 3 >= matrix.length) return false

      if (matrix[y][x] !== 'X') return false
      if (matrix[y + yInc][x + xInc] !== 'M') return false
      if (matrix[y + yInc * 2][x + xInc * 2] !== 'A') return false
      if (matrix[y + yInc * 3][x + xInc * 3] !== 'S') return false

      return true
    }

    let count = 0

    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'X') {
          count += countXmas(matrix, x, y)
        }
      })
    }
    )

    return count
  }

  public solveSecond(): number {
    const matrix = this.input.trim().split('\n').map(a => a.split(''))

    const isXmas = (matrix: string[][], x: number, y: number): boolean => {
      if (matrix[y][x] !== 'A') return false

      if (x - 1 < 0 || x + 1 >= matrix[0].length) return false
      if (y - 1 < 0 || y + 1 >= matrix.length) return false

      const firstMas = (matrix[y - 1][x - 1] === 'M' && matrix[y + 1][x + 1] === 'S') || (matrix[y - 1][x - 1] === 'S' && matrix[y + 1][x + 1] === 'M')
      if (!firstMas) return false

      const secondMas = (matrix[y - 1][x + 1] === 'M' && matrix[y + 1][x - 1] === 'S') || (matrix[y - 1][x + 1] === 'S' && matrix[y + 1][x - 1] === 'M')
      if (!secondMas) return false

      return true
    }

    let count = 0

    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'A') {
          if (isXmas(matrix, x, y)) {
            count++
          }
        }
      })
    }
    )

    return count
  }

}

