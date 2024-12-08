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
    // WRITE SOLUTION 1
    return 'solution 1';
  }

  public solveSecond(): string | number {
    // WRITE SOLUTION 2
    return 'day 1 solution 2';
  }

}