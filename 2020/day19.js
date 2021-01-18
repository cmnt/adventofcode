const { getData } = require('./input');

(async () => {
    const data = await getData(19);
    const puzzle = data.data.split('\n');
    puzzle.length -= 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    // console.log(resultPart2(puzzle));
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
        .map((a) => isLineMatchRule(a, rules))
        .filter(Boolean)
        .length;
};

const isLineMatchRule = (line, rules) => {
    const matchMultipleRules = (line, rulesToMatch) => {
        let isMatch = true;
        let length = 0;

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
};
