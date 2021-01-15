/* eslint-disable no-eval */
/* eslint-disable consistent-return */
const { _ } = require('lodash');
const { getData } = require('./input');

(async () => {
    const data = await getData(17);
    const puzzle = data.data.split('\n').map((line) => line.split(''));
    puzzle.length -= 1;
    // console.log(puzzle);
    console.log(resultPart1(example));
    console.log(resultPart2(puzzle));
})();

const example = [['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']];

const resultPart1 = (puzzle) => {
    const states = multipleApplyCycle([puzzle], 6);
    const numberActiveStates = getNumberActiveStates(states);
    return numberActiveStates;
};

const multipleApplyCycle = (state, numberApply) => {
    let nextState = state;
    for (let index = 0; index < numberApply; index += 1) {
        nextState = applyCycle(nextState);
    }
    return nextState;
};

const applyCycle = (state) => {
    const zLength = state.length;
    const yLength = state[0].length;
    const xLength = state[0][0].length;
    const nextState = Array.from({ length: zLength + 2 }, () => Array.from({ length: yLength + 2 }, () => Array(xLength + 2).fill('.')));

    for (let zIndex = 0; zIndex < nextState.length; zIndex += 1) {
        const z = nextState[zIndex];
        for (let yIndex = 0; yIndex < z.length; yIndex += 1) {
            const y = nextState[zIndex][yIndex];
            for (let xIndex = 0; xIndex < y.length; xIndex += 1) {
                const currentCoords = translateNextCoordsToCurrentCoords([zIndex, yIndex, xIndex]);
                const sumActiveNeighbors = getSumActiveNeighbors(currentCoords, state);

                const isNextActive = sumActiveNeighbors === 3 || (isActiveState(currentCoords, state) && sumActiveNeighbors === 2);

                if (isNextActive) {
                    nextState[zIndex][yIndex][xIndex] = '#';
                }
            }
        }
    }

    return nextState;
};

const getNumberActiveStates = (state) => _.flattenDeep(state).filter((field) => field === '#').length;
const translateNextCoordsToCurrentCoords = (coords) => coords.map((coord) => coord - 1);
const isActiveState = (coords, state) => !!(state[coords[0]] && state[coords[0]][coords[1]] && state[coords[0]][coords[1]][coords[2]] && state[coords[0]][coords[1]][coords[2]] === '#');

const getSumActiveNeighbors = (coords, state) => {
    let sum = 0;

    const [zCoords, yCoords, xCoords] = coords;
    for (let zIndex = zCoords - 1; zIndex <= zCoords + 1; zIndex += 1) {
        const z = state[zIndex];
        if (!z) {
            continue;
        }
        for (let yIndex = yCoords - 1; yIndex <= yCoords + 1; yIndex += 1) {
            const y = z[yIndex];
            if (!y) {
                continue;
            }
            for (let xIndex = xCoords - 1; xIndex <= xCoords + 1; xIndex += 1) {
                const x = y[xIndex];
                if (!x || (zIndex === zCoords && yIndex === yCoords && xIndex === xCoords)) {
                    continue;
                }

                const isActiveCase = x === '#';
                if (isActiveCase) {
                    sum += 1;
                }
            }
        }
    }
    return sum;
};

// PART 2
const resultPart2 = (puzzle) => {
};
