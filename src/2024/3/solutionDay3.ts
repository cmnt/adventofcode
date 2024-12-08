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
    const memory = this.input

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
    const matches = [...memory.matchAll(regex)]
      .map(a => a.slice(1, 3))
      .map(a => a.map(Number))

    const result = matches.reduce((acc, [a, b]) => acc + a * b, 0)

    return result
  }

  public solveSecond(): number {
    const memory = this.input

    const inputText = `
    some text
    mul(12,34)
    some more text
    do()
    don't()
    mul(123,456)
    mul(1234,56) // This will not match because 1234 has more than 3 digits
    `

    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
    const matches = [...memory.matchAll(regex)]
      .map(a => a.at(0)?.startsWith('mul') ? a.slice(1, 3) : a.at(0))

    const mults = matches.reduce((acc, match) => {
      const { isDoing, result } = acc

      if (match === 'do()') {
        return { ...acc, isDoing: true }
      }

      if (!isDoing) return acc

      if (match === "don't()") {
        return { ...acc, isDoing: false }
      }

      const [a, b] = match as [string, string]
      return { ...acc, result: result + Number(a) * Number(b) }

    }, { isDoing: true, result: 0 })

    return mults.result
  }

}
