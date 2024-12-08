const { getData } = require('./input');

(async () => {
  const data = await getData(3);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  console.log(resultPart1(puzzle));
  console.log(resultPart2(puzzle));
  console.log(resultPart2WithOnlyOnePuzzleParsingUsingObject(puzzle));
  console.log(resultPart2WithOnlyOnePuzzleParsingUsingArray(puzzle));
})();

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const resultPart1 = (puzzle) => numberTreesEncounter(puzzle, { right: 3, down: 1 });

const resultPart2 = (puzzle) => getNumTreesMult(puzzle, slopes);

const resultPart2WithOnlyOnePuzzleParsingUsingObject = (puzzle) => {
  const slopesWithresult = slopes.map((slope) => ({ ...slope, trees: 0 }));
  const widthPuzzle = puzzle[0].length;

  puzzle.map((line, index) => {
    slopesWithresult.map((slope) => {
      if (index % slope.down !== 0) {
        return;
      }

      const indexRow = (index * (slope.right / slope.down)) % widthPuzzle;

      if (line[indexRow] === '#') {
        slope.trees += 1;
      }
    });
  });

  return slopesWithresult.reduce((trees, slope) => trees * slope.trees, 1);
};

const resultPart2WithOnlyOnePuzzleParsingUsingArray = (puzzle) => {
  const trees = Array(slopes.length).fill(0);
  const widthPuzzle = puzzle[0].length;

  const res = puzzle.reduce((accTrees, line, index) => {
    slopes.map((slope, indexSlope) => {
      if (index % slope.down !== 0) {
        return;
      }

      const indexRow = (index * (slope.right / slope.down)) % widthPuzzle;

      if (line[indexRow] === '#') {
        accTrees[indexSlope] += 1;
      }
    });
    return accTrees;
  }, trees);

  return res.reduce((treesMult, trees) => treesMult * trees, 1);
};

const getNumTreesMult = (puzzle, slopes) => {
  const res = slopes.map((slope) => numberTreesEncounter(puzzle, slope));
  return res.reduce((mult, numTreeSlope) => numTreeSlope * mult, 1);
};

const numberTreesEncounter = (puzzle, slope) => {
  const widthPuzzle = puzzle[0].length;

  return puzzle.reduce((trees, line, index) => {
    if (index % slope.down !== 0) {
      return trees;
    }

    const indexRow = (index * (slope.right / slope.down)) % widthPuzzle;
    return line[indexRow] === '#' ? trees + 1 : trees;
  }, 0);
};
