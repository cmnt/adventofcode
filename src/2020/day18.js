const { getData } = require('./input');

(async () => {
  const data = await getData(18);
  const puzzle = data.data.split('\n')
    .map((a) => a.split('')
      .filter((a) => a !== ' ')
      .map((a) => (Number.isNaN(parseInt(a)) ? a : parseInt(a))));
  puzzle.length -= 1;
  // console.log(puzzle);
  console.log(resultPart1(puzzle));
  console.log(resultPart2(puzzle));
})();

const example = [
  [2, '*', 3, '+', '(', 4, '*', 5, ')'],
  [5, '+', '(', 8, '*', 3, '+', 9, '+', 3, '*', 4, '*', 3, ')'],
  [5, '*', 9, '*', '(', 7, '*', 3, '*', 3, '+', 9, '*', 3, '+', '(', 8, '+', 6, '*', 4, ')', ')'],
  ['(', '(', 2, '+', 4, '*', 9, ')', '*', '(', 6, '+', 9, '*', 8, '+', 6, ')', '+', 6, ')', '+', 2, '+', 4, '*', 2],
];

const resultPart1 = (puzzle) => puzzle.reduce((sum, line) => sum + evalExpression(line), 0);

const evalExpression = (expression) => {
  let res = 0;
  let currentOpertor;
  for (let index = 0; index < expression.length; index += 1) {
    const element = expression[index];

    if (isOpenedP(element)) {
      const indexClosed = findIndexClodedP(index, expression);
      const value = evalExpression(expression.slice(index + 1, indexClosed));
      if (currentOpertor) {
        res = currentOpertor === '*' ? res * value : res + value;
        currentOpertor = '';
      } else {
        res = value;
      }
      index = indexClosed;
      continue;
    }

    if (typeof (element) === 'number') {
      if (currentOpertor) {
        res = currentOpertor === '*' ? res * element : res + element;
        currentOpertor = '';
        continue;
      }
      res = element;
      continue;
    }

    if (isMult(element) || isAdd(element)) {
      currentOpertor = element;
      continue;
    }
  }
  return res;
};

const findIndexClodedP = (indexOpenedP, expression) => {
  let otherOpenedP = 0;
  let indexClosedP;

  for (let index = indexOpenedP + 1; index < expression.length; index += 1) {
    const element = expression[index];
    if (isClosedP(element)) {
      if (!otherOpenedP) {
        indexClosedP = index;
        break;
      }
      otherOpenedP -= 1;
    }

    if (isOpenedP(element)) {
      otherOpenedP += 1;
    }
  }
  return indexClosedP;
};

const isMult = (e) => e === '*';
const isAdd = (e) => e === '+';
const isOpenedP = (e) => e === '(';
const isClosedP = (e) => e === ')';

// PART2
const resultPart2 = (puzzle) => {
  const puzzleAddPriority = puzzle.map(addParenthesesToAdd)
    .reduce((sum, line) => sum + evalExpression(line), 0);
  return puzzleAddPriority;
};

const addParenthesesToAdd = (expression) => {
  let newExpression = [...expression];

  for (let index = newExpression.length - 1; index >= 0; index -= 1) {
    if (!(newExpression[index] === '+')) {
      continue;
    }

    const indexValueAfter = isOpenedP(newExpression[index + 1]) ? findIndexClodedP(index + 1, newExpression) : index + 1;
    const indexValueBefore = isClosedP(newExpression[index - 1]) ? findIndexOpenP(index - 1, newExpression) : index - 1;

    newExpression = [
      ...newExpression.slice(0, indexValueBefore), '(',
      ...newExpression.slice(indexValueBefore, indexValueAfter + 1), ')',
      ...newExpression.slice(indexValueAfter + 1),
    ];
  }

  return newExpression;
};

const findIndexOpenP = (indexClosedP, expression) => {
  let otherClosedP = 0;
  let indexOpenedP;

  for (let index = indexClosedP - 1; index >= 0; index -= 1) {
    const element = expression[index];
    if (isOpenedP(element)) {
      if (!otherClosedP) {
        indexOpenedP = index;
        break;
      }
      otherClosedP -= 1;
    }

    if (isClosedP(element)) {
      otherClosedP += 1;
    }
  }
  return indexOpenedP;
};
