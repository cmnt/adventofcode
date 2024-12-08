 
const { getData } = require('./input');

(async () => {
  const data = await getData(9);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  // console.log(puzzle);
  console.log(resultPart1(puzzle));
  console.log(resultPart2(puzzle));
})();

const resultPart1 = (puzzle) => findInvalidNumber(puzzle);

const resultPart2 = (puzzle) => {
  const contiguousSet = findContiguousSet(puzzle, findInvalidNumber(puzzle));
  const sumMaxMin = Math.min(...contiguousSet) + Math.max(...contiguousSet);
  return sumMaxMin;
};

const findContiguousSet = (sequence, invalidNumber) => {
  for (let index = 0; index < sequence.length; index += 1) {
    const number = parseInt(sequence[index]);
    if (number === invalidNumber) {
      continue;
    }

    const set = [number];
    let sum = number;
    let nextIndex = index + 1;
    while (sum <= invalidNumber) {
      if (sum === invalidNumber) {
        return set;
      }
      const nextNumber = parseInt(sequence[nextIndex]);
      set.push(nextNumber);
      sum += nextNumber;
      nextIndex += 1;
    }
  }
};

const findInvalidNumber = (sequence) => {
  for (let index = 25; index < sequence.length; index += 1) {
    const number = parseInt(sequence[index]);
    const subSequence = sequence.slice(index - 25, index);
    const isValid = isValidNumberInSequence(number, subSequence);

    if (!isValid) {
      return number;
    }
  }
};

const isValidNumberInSequence = (number, sequence) => {
  for (let index1 = 0; index1 < sequence.length - 1; index1 += 1) {
    const number1 = parseInt(sequence[index1]);

    for (let index2 = index1; index2 < sequence.length; index2 += 1) {
      if (index1 === index2) {
        continue;
      }

      const number2 = parseInt(sequence[index2]);

      if (number1 + number2 === number) {
        return true;
      }
    }
  }
  return false;
};
