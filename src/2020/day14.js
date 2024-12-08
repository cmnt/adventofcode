const { getData } = require('./input');

(async () => {
  const data = await getData(14);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  // console.log(puzzle);
  console.log(`Part1 : \n Exemple : ${resultPart1(example1)}\n Result : ${resultPart1(puzzle)}`);
  console.log(`Part2 : \n Exemple : ${resultPart2(example2)}\n Result : ${resultPart2(puzzle)}`);
})();

const example1 = ['mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0]'];

const example2 = ['mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1'];

const resultPart1 = (puzzle) => {
  const [memory] = puzzle.reduce((acc, line) => {
    if (line.startsWith('mask')) {
      acc[1] = extractMaskFromLine(line);
      return acc;
    }

    const [address, valueDec] = extractAddressAndValueFromLine(line);
    const valueBin = dec2bin(valueDec);
    const resultBin = applyMask(valueBin, acc[1]);

    acc[0][address] = bin2dec(resultBin);
    return acc;
  }, [{}, '']);

  const sumValues = Object.values(memory).reduce((a, b) => a + b, 0);
  return sumValues;
};

const resultPart2 = (puzzle) => {
  const [memory] = puzzle.reduce((acc, line) => {
    if (line.startsWith('mask')) {
      acc[1] = extractMaskFromLine(line);
      return acc;
    }

    const [address, valueDec] = extractAddressAndValueFromLine(line);
    const addressBin = dec2bin(address);
    const adressesWithMaskApplied = applyMask(addressBin, acc[1], false);

    const addressesGenerate = generateAddressesFromFloating(adressesWithMaskApplied);
    addressesGenerate.map((address) => { acc[0][address] = valueDec; });
    return acc;
  }, [{}, '']);

  const sumValues = Object.values(memory).reduce((a, b) => a + b, 0);
  return sumValues;
};

const dec2bin = (dec) => (dec >>> 0).toString(2);
const bin2dec = (bin) => parseInt(bin, 2);
const extractMaskFromLine = (line) => line.slice(7);
const extractAddressAndValueFromLine = (line) => line.slice(4).split('=').map(parseFloat);

const applyMask = (bin, mask, isPart1 = true) => {
  const binArray = bin.split('');
  const binLength = binArray.length;

  const addressWithMaskApplied = binArray.reduce((addressWithMaskApplied, bit, index) => {
    const indexRes = addressWithMaskApplied.length - binLength + index;
    if (isPart1 && addressWithMaskApplied[indexRes] !== 'X') {
      return addressWithMaskApplied;
    }
    if (!isPart1 && (addressWithMaskApplied[indexRes] === 'X' || addressWithMaskApplied[indexRes] === '1')) {
      return addressWithMaskApplied;
    }
    addressWithMaskApplied[indexRes] = bit;
    return addressWithMaskApplied;
  }, mask.split(''));

  return isPart1 ? addressWithMaskApplied.join('').replace(/X/g, '0') : addressWithMaskApplied.join('');
};

const generateAddressesFromFloating = (floatingAdresses) => {
  const floatingAdressesArray = floatingAdresses.split('');
  const floatingIndexes = floatingAdressesArray.reduce((acc, bit, index) => {
    if (bit === 'X') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (floatingIndexes.length === 0) {
    return [floatingAdresses];
  }

  const floatingCombinations = generateCombination(floatingIndexes.length);

  return floatingCombinations.reduce((acc, combination) => {
    const combinationArray = combination.split('');
    floatingIndexes.map((fIndex, index) => {
      floatingAdressesArray[fIndex] = combinationArray[index];
    });
    acc.push(floatingAdressesArray.join(''));
    return acc;
  }, []);
};

const generateCombination = (combinationLength) => {
  const res = [];

  const recursive = (fCombination) => {
    if (fCombination.length === combinationLength) {
      res.push(fCombination);
      return;
    }
    recursive(`${fCombination}0`);
    recursive(`${fCombination}1`);
  };

  recursive('');
  return res;
};
