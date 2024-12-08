const { getData } = require('./input');

(async () => {
  const data = await getData(2);
  const passTests = data.data.split('\n');
  passTests.length -= 1;
  console.log(HowManyPasstestValidPart1(passTests));
  console.log(HowManyPasstestValidPart2(passTests));
})();

const HowManyPasstestValidPart1 = (passTests) => passTests.reduce((numValid, passTest) => (isPassTestValidPart1(passTest) ? numValid + 1 : numValid), 0);

const isPassTestValidPart1 = (passTest) => {
  const [range, letterDirty, pass] = passTest.split(' ');
  const [rangeMin, rangeMax] = range.split('-').map((textNum) => parseInt(textNum));
  const letter = letterDirty.slice(0, 1);

  const numLetterInPass = pass.split('').filter((letterPass) => letterPass === letter).length;
  return rangeMin <= numLetterInPass && numLetterInPass <= rangeMax;
};

const HowManyPasstestValidPart2 = (passTests) => passTests.reduce((numValid, passTest) => (isPassTestValidPart2(passTest) ? numValid + 1 : numValid), 0);

const isPassTestValidPart2 = (passTest) => {
  const [indexes, letterDirty, pass] = passTest.split(' ');
  const [index1, index2] = indexes.split('-').map((textNum) => parseInt(textNum) - 1);
  const letter = letterDirty.slice(0, 1);

  return pass[index1] === letter ^ pass[index2] === letter; // XOR operator
};
