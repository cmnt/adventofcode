const { getData } = require('./input');

const PROPERTIES = [{
  name: 'byr',
  regex: /^(19[2-9]\d)|(20([0-1]\d|20))$/,
}, {
  name: 'iyr',
  regex: /^20(1\d|20)$/,
}, {
  name: 'eyr',
  regex: /^20(2\d|30)$/,
}, {
  name: 'hgt',
  regex: /^(1([5-8]\d|9[0-3])cm)|((59|6\d|7[0-6])in)$/,
}, {
  name: 'hcl',
  regex: /^#(\d|[a-f]){6}$/,
}, {
  name: 'ecl',
  regex: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
}, {
  name: 'pid',
  regex: /^\d{9}$/,
}];

(async () => {
  const data = await getData(4);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  // console.log(puzzle);
  console.log(resultPart1(puzzle));
  console.log(resultPart2(puzzle));
})();

const resultPart1 = (puzzle) => {
  const passports = transformToArrayOfObjectPassports(puzzle);
  const validPassports = passports.filter((passport) => isPassportValidPart1(passport));
  return validPassports.length;
};

const resultPart2 = (puzzle) => {
  const passports = transformToArrayOfObjectPassports(puzzle);
  const validPassports = passports.filter((passport) => isPassportValidPart2(passport));
  return validPassports.length;
};

const transformToArrayOfObjectPassports = (puzzle) => puzzle.reduce((transformArray, line) => {
  if (!line.length) {
    transformArray.push({});
    return transformArray;
  }

  const keyValueFields = line.split(' ');

  const newKeyValue = keyValueFields.reduce((passport, keyValue) => {
    const [key, value] = keyValue.split(':');
    passport[key] = value;
    return passport;
  }, {});

  transformArray[transformArray.length - 1] = {
    ...transformArray[transformArray.length - 1],
    ...newKeyValue,
  };

  return transformArray;
}, [{}]);

const isPassportValidPart1 = (passport) => PROPERTIES.every((property) => Object.prototype.hasOwnProperty.call(passport, property.name));

const isPassportValidPart2 = (passport) => PROPERTIES.every((property) => Object.prototype.hasOwnProperty.call(passport, property.name) && property.regex.test(passport[property.name]));
