const {
    getData
} = require("./input");

(async () => {
    const data = await getData(10);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;

    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})()

const resultPart1 = (puzzle) => {
    const [diff1, diff2, diff3] = getDifferences(puzzle);
    return diff1 * diff3;
}

const resultPart2 = (puzzle) => {
    const adapters = puzzle.map(Number).sort((a, b) => a - b);
    const nodes = getNodes(adapters);

    const firstAdapters = adapters.filter(adpt => adpt > 0 && adpt <= 3);
    return firstAdapters.reduce((sum, adtp) => nodes[adtp] + sum, 0)
}

const getDifferences = (puzzle) => {
    const adapters = puzzle.map(Number).sort((a, b) => a - b);
    const differences = [0, 0, 1];

    for (let i = 0; i < adapters.length; i++) {
        const adapter = adapters[i];
        const precAdapter = i === 0 ? 0 : adapters[i - 1]
        const diff = adapter - precAdapter;

        if (diff > 3) break;

        differences[diff - 1] += 1;
    }

    return differences
}


const getNodes = (adapters) => {
    const nodes = {};

    for (let index = adapters.length - 1; index >= 0; index--) {
        const node = adapters[index];

        //if first
        if (index === adapters.length - 1) {
            nodes[node] = 1;
            continue;
        }

        const validePrecNodes = adapters.filter(adpt => adpt - node > 0 && adpt - node <= 3);

        nodes[node] = validePrecNodes.reduce((sum, node) => sum + nodes[node], 0)
    }
    return nodes;

}