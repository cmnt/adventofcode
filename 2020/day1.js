const { getData } = require('./input');

(async () => {
    const data = await getData(1).data.trim().split('\n').map((text) => parseInt(text));
    const theTwoNumbers = findTwoNumbersEqual2020(data);
    const theTwoNumbersMultiple = theTwoNumbers && theTwoNumbers.num1 * theTwoNumbers.num2;
    console.log(theTwoNumbersMultiple);
})();

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
