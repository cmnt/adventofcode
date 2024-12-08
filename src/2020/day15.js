const { getData } = require('./input');

(async () => {
  const data = await getData(15);
  const puzzle = data.data.split('\n')[0].split(',').map(Number);

  console.log(`Part1 : ${result(puzzle, 2020)}`);
  console.log(`Part2 : ${result(puzzle, 30000000)}`);
})();

const result = (puzzle, targetTurn) => {
  let currentValue = puzzle[puzzle.length - 1];
  let currentTurn = puzzle.length;
  const indexHistory = new Map();

  puzzle.map((num, i) => indexHistory.set(num, i + 1));

  while (currentTurn !== targetTurn) {
    const lastIndex = indexHistory.get(currentValue);
    indexHistory.set(currentValue, currentTurn);
    currentValue = lastIndex ? currentTurn - lastIndex : 0;
    currentTurn += 1;
  }
  return currentValue;
};
