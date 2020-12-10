const {
    getData
} = require("./input");

(async () => {
    const data = await getData(8);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})()

const resultPart1 = (puzzle) => {
    const [acc] = execInstructions(puzzle)
    return acc;
}

const resultPart2 = (puzzle) => {
    for (let index = 0; index < puzzle.length; index++) {
        const instruction = puzzle[index];

        if (instruction.startsWith('acc')) {
            continue;
        }

        const newInstructions = [...puzzle];

        if (instruction.startsWith('nop')) {
            newInstructions[index] = `jmp${instruction.slice(3)}`
        }

        if (instruction.startsWith('jmp')) {
            newInstructions[index] = `nop${instruction.slice(3)}`
        }

        const [acc, isLoop] = execInstructions(newInstructions);
        if (!isLoop) {
            return acc;
        }
    }

}

const execInstructions = (instructions) => {
    let acc = 0;
    let historyIndex = [];
    let indexNextInstruction = 0;
    let isLoop = false;

    while (indexNextInstruction < instructions.length) {
        isLoop = historyIndex.includes(indexNextInstruction);
        if (isLoop) {
            break;
        }
        historyIndex.push(indexNextInstruction);

        const instruction = instructions[indexNextInstruction];
        const instructionType = instruction.slice(0, 3);
        const instructionNumber = parseInt(instruction.split(' ')[1]);

        switch (instructionType) {
            case 'acc':
                acc += instructionNumber;
                indexNextInstruction += 1;
                break;
            case 'jmp':
                indexNextInstruction += instructionNumber;
                break;
            case 'nop':
                indexNextInstruction += 1;
        }
    }
    return [acc, isLoop];
}