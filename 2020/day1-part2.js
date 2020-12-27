const { getData } = require('./input');

(async () => {
    const data = await getData(1).data.trim().split('\n').map((text) => parseInt(text, 10));
    const theNumbersSum2020 = findXNumbersSum2020(data, 3);
    const theNumbersMultiple = theNumbersSum2020.reduce((mult, number) => mult * number, 1);
    console.log(theNumbersMultiple);
})();

const findXNumbersSum2020 = (numbers, x) => {
    const resultIndexes = [];
    for (let index = 0; index < x; index += 1) {
        resultIndexes.push(null);
    }
    const indexes = genericLoop(numbers, resultIndexes);
    console.log(indexes);
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
