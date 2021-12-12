let threads = [1, 2, 3, 4];
// YOUR CODE HERE
let output = '';

const getBestConnectIndex = (array) => array.reduce((acc, num, i) => {
    if (i === array.length) {
        return acc;
    }
    const valueConnect = num + array[i + 1];
    if (valueConnect < acc[0]) {
        return [valueConnect, i];
    }
    return acc;
}, [array[0] + array[1], 0]);

while (threads.length > 1) {
    const [value, index] = getBestConnectIndex(threads);
    if (index + 2 < threads.length) {
        threads = [...threads.slice(0, index), value, ...threads.slice(index + 2)];
    } else {
        threads = [...threads.slice(0, index), value];
    }
}

[output] = threads;

console.log(output);
