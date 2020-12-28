const { getData } = require('./input');

(async () => {
    const data = await getData(1);
    const input = data.data.trim().split('\n').map((text) => parseInt(text));
    console.log(resultPart1(input));
    console.log(resultPart2(input));
})();

const resultPart1 = (puzzle) => {
    const theTwoNumbers = findTwoNumbersEqual2020(puzzle);
    const theTwoNumbersMultiple = theTwoNumbers && theTwoNumbers.num1 * theTwoNumbers.num2;
    return theTwoNumbersMultiple;
};

const resultPart2 = (puzzle) => {
    const theNumbersSum2020 = findXNumbersSum2020(puzzle, 3);
    const theNumbersMultiple = theNumbersSum2020.reduce((mult, number) => mult * number, 1);
    return theNumbersMultiple;
};

const findTwoNumbersEqual2020 = (numbers) => {
    for (let index1 = 0; index1 < numbers.length; index1 += 1) {
        const num1 = numbers[index1];

        for (let index2 = 0; index2 < numbers.length; index2 += 1) {
            const num2 = numbers[index2];

            if (index1 === index2) {
                continue;
            }

            if (num1 + num2 !== 2020) {
                continue;
            }

            return {
                num1,
                num2,
            };
        }
    }
    return undefined;
};

const findXNumbersSum2020 = (numbers, x) => {
    const resultIndexes = [];
    for (let index = 0; index < x; index += 1) {
        resultIndexes.push(null);
    }
    const indexes = genericLoop(numbers, resultIndexes);
    return indexes.map((i) => numbers[i]);
};

const genericLoop = (numbers, resultIndexes_) => {
    const resultIndexes = resultIndexes_;
    if (!resultIndexes.includes(null)) {
        return resultIndexes;
    }

    const currentIndex = resultIndexes.indexOf(null);
    const isLastindex = currentIndex === resultIndexes.length - 1;

    for (let index = 0; index < numbers.length; index += 1) {
        if (resultIndexes.includes(index)) {
            continue;
        }
        resultIndexes[currentIndex] = index;

        if (!isLastindex) {
            const result = genericLoop(numbers, resultIndexes);

            if (resultIndexes.includes(null)) {
                continue;
            }
            return result;
        }
        const resultValuesSum = resultIndexes
            .map((resultIndex) => numbers[resultIndex])
            .reduce((sum, value) => sum + value, 0);
        if (resultValuesSum !== 2020) {
            continue;
        }

        return resultIndexes;
    }
    resultIndexes[currentIndex] = null;
    return resultIndexes;
};
