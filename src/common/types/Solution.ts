export default abstract class Solution implements ISolution {
  protected input: string

  public abstract solveFirst(): string | number
  public abstract solveSecond(): string | number

  public display(): void {
    console.log(`First solution: ${this.solveFirst()}`)
    console.log(`Second solution: ${this.solveSecond()}`)
  }

  public setInput(input: string): void {
    this.input = input
  }

  public static formatToArray(input, type) {
    return input.trim().split('\n').map((text) => type === 'int' ? parseInt(text) : text)
  }

}

interface ISolution {
  solveFirst: () => string | number
  solveSecond: () => string | number
  setInput: (input: string) => void
  display: () => void
}
