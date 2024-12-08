const { _ } = require('lodash');
const { getData } = require('./input');

(async () => {
  const data = await getData(19);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  // console.log(puzzle);
  // console.log(resultPart1(examplePart2));
  console.log(resultPart2(examplePart2));
})();

const example = ['0: 4 1 5',
  '1: 2 3 | 3 2',
  '2: 4 4 | 5 5',
  '3: 4 5 | 5 4',
  '4: "a"',
  ' 5: "b"',
  '',
  'ababbb',
  'bababa',
  'abbbab',
  'aaabbb',
  'aaaabbb'];

const resultPart1 = (puzzle) => {
  const [rules, messages] = extractRulesAndMessages(puzzle);
  return messages
    .map((message) => isLineMatchRule(message, rules))
    .filter(Boolean)
    .length;
};

const isLineMatchRule = (line, rules) => {
  let count = 0;
  const matchMultipleRules = (line, rulesToMatch) => {
    let isMatch = true;
    let length = 0;
    count += 1;

    for (let index = 0; index < rulesToMatch.length; index += 1) {
      if (!isMatch) {
        return [isMatch, length];
      }
      const ruleToMatch = rulesToMatch[index];
      let res;

      const rule = rules.get(Number(ruleToMatch));
      const hasOr = Array.isArray(rule[0]);
      const isLetter = !hasOr && !Number(rule[0]);

      if (isLetter) {
        res = [(line[length] === rule[0]), 1];
      }

      if (hasOr) {
        const matchFirstRule = matchMultipleRules(line.slice(length), rule[0]);

        if (matchFirstRule[0]) {
          res = matchFirstRule;
        } else {
          const matchSecondRule = matchMultipleRules(line.slice(length), rule[1]);
          res = matchSecondRule;
        }
      }

      if (!isLetter && !hasOr) {
        res = matchMultipleRules(line.slice(length), rule);
      }

      isMatch = isMatch && res[0];
      length += res[1];
    }
    return [isMatch, length];
  };

  const [isMatch, length] = matchMultipleRules(line, [0]);
  // console.log(line, count, isMatch, length === line.length);
  return isMatch && (length === line.length);
};

const extractRulesAndMessages = (puzzle) => {
  const indexEndRules = puzzle.indexOf('');
  const dirtyRules = puzzle.slice(0, indexEndRules);
  const messages = puzzle.slice(indexEndRules + 1);
  const rules = new Map();

  dirtyRules.map((dirtyRule) => {
    const indexRuleName = dirtyRule.indexOf(':');
    const ruleName = parseInt(dirtyRule.slice(0, indexRuleName));
    let rule = dirtyRule
      .slice(indexRuleName + 1)
      .split(' ')
      .filter(Boolean)
      .map((field) => (Number(field) ? Number(field) : field.replace(/['"]+/g, '')));
    const indexOr = rule.indexOf('|');
    if (indexOr !== -1) {
      rule = [[...rule.slice(0, indexOr)], [...rule.slice(indexOr + 1)]];
    }
    rules.set(ruleName, rule);
  });
  return [rules, messages];
};

// PART2
const resultPart2 = (puzzle) => {
  const [rules, messages] = extractRulesAndMessages(puzzle);
  rules.set(8, [[42], [42, 8]]);
  rules.set(11, [[42, 31], [42, 11, 31]]);

  // return isLineMatchRule(messages[2], rules);
  // console.log(rules);
  return messages
    .filter((message) => isLineMatchRulePart2(message, rules));
};

const isLineMatchRulePart2 = (line, rules) => {
  let count = 0;
  const matchMultipleRules = (line, rulesToMatch) => {
    let isMatch = true;
    let length = 0;
    count += 1;

    for (let index = 0; index < rulesToMatch.length; index += 1) {
      if (!isMatch) {
        return [isMatch, length];
      }
      const ruleToMatch = rulesToMatch[index];
      let res;

      const rule = rules.get(Number(ruleToMatch));
      const hasOr = Array.isArray(rule[0]);
      const isLetter = !hasOr && !Number(rule[0]);

      if (isLetter) {
        res = [(line[length] === rule[0]), 1];
      }

      if (hasOr) {
        const matchFirstRule = matchMultipleRules(line.slice(length), rule[0]);
        // const matchNext = rule[0].slice(1).length && matchMultipleRules(line.slice(length + matchFirstRule[1]), rule[0].slice(1));

        if (matchFirstRule[0]) {
          res = matchFirstRule;
        } else {
          const matchSecondRule = matchMultipleRules(line.slice(length), rule[1]);
          res = matchSecondRule;
        }
      }

      if (!isLetter && !hasOr) {
        const isContainsLoop = containsLoop(rule, rules);
        const nextIndex = rulesToMatch.length > index + 1 ? index + 1 : null;
        if (isContainsLoop) {
          res = matchMultipleRules(line.slice(length), [...rule[0], rulesToMatch[nextIndex]]);
          if (!res[0]) {
            res = matchMultipleRules(line.slice(length), rule[1]);
          }
        } else {
          res = matchMultipleRules(line.slice(length), rule);
        }
      }

      isMatch = isMatch && res[0];
      length += res[1];
    }
    return [isMatch, length];
  };

  const [isMatch, length] = matchMultipleRules(line, [0]);
  // console.log(line, count, isMatch, length === line.length);
  return isMatch && (length === line.length);
};

const containsLoop = (rule, rules) => {
  const nextRules = rules.get(rule);
  return _.flattenDeep(nextRules).includes(rule);
};

const examplePart2 = ['42: 9 14 | 10 1',
  '9: 14 27 | 1 26',
  '10: 23 14 | 28 1',
  '1: "a"',
  '11: 42 31',
  '5: 1 14 | 15 1',
  '19: 14 1 | 14 14',
  '12: 24 14 | 19 1',
  '16: 15 1 | 14 14',
  '31: 14 17 | 1 13',
  '6: 14 14 | 1 14',
  '2: 1 24 | 14 4',
  '0: 8 11',
  '13: 14 3 | 1 12',
  '15: 1 | 14',
  '17: 14 2 | 1 7',
  '23: 25 1 | 22 14',
  '28: 16 1',
  '4: 1 1',
  '20: 14 14 | 1 15',
  '3: 5 14 | 16 1',
  '27: 1 6 | 14 18',
  '14: "b"',
  '21: 14 1 | 1 14',
  '25: 1 1 | 1 14',
  '22: 14 14',
  '8: 42',
  '26: 14 22 | 1 20',
  '18: 15 15',
  '7: 14 5 | 1 21',
  '24: 14 1',
  '',
  'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
  'bbabbbbaabaabba',
  'babbbbaabbbbbabbbbbbaabaaabaaa',
  'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
  'bbbbbbbaaaabbbbaaabbabaaa',
  'bbbababbbbaaaaaaaabbababaaababaabab',
  'ababaaaaaabaaab',
  'ababaaaaabbbaba',
  'baabbaaaabbaaaababbaababb',
  'abbbbabbbbaaaababbbbbbaaaababb',
  'aaaaabbaabaaaaababaa',
  'aaaabbaaaabbaaa',
  'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
  'babaaabbbaaabaababbaabababaaab',
  'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba'];
