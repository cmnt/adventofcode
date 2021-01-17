/* eslint-disable no-eval */
/* eslint-disable consistent-return */
const { _ } = require('lodash');
const { getData } = require('./input');

(async () => {
    const data = await getData(17);
    const puzzle = data.data.split('\n').map((line) => line.split(''));
    puzzle.length -= 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
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
    const pocket = multipleApplyCycleGeneric(puzzle, 4, 6);
    const numberActiveStates = getNumberActiveStates(pocket);
    return numberActiveStates;
};

const multipleApplyCycleGeneric = (pocket, numberDimensions, numberApply) => {
    let nextPocket = pocket;
    for (let index = 0; index < numberDimensions - 2; index += 1) {
        nextPocket = [nextPocket];
    }

    for (let index = 0; index < numberApply; index += 1) {
        nextPocket = applyCycleGeneric(nextPocket, numberDimensions);
    }
    return nextPocket;
};

const applyCycleGeneric = (pocket) => {
    const nextPocket = generatePocketSkeleton(pocket);
    const fillnextPocket = (pocket, nextPock, coords) => {
        if (!Array.isArray(nextPock)) {
            const currentCoords = translateNextCoordsToCurrentCoords(coords);
            const sumActiveNeighbors = getSumActiveNeighborsGeneric(pocket, currentCoords);
            const isNextActive = sumActiveNeighbors === 3 || (isActiveStateGeneric(currentCoords, pocket) && sumActiveNeighbors === 2);
            if (isNextActive) {
                setState(nextPocket, coords, '#');
            }
        } else {
            for (let index = 0; index < nextPock.length; index += 1) {
                fillnextPocket(pocket, nextPock[index], [...coords, index]);
            }
        }
    };

    fillnextPocket(pocket, nextPocket, []);

    return nextPocket;
};

const generatePocketSkeleton = (pocket) => {
    const length = pocket.length + 2;
    if (!Array.isArray(pocket[0])) {
        return Array(length).fill('.');
    }
    return Array.from({ length }, () => generatePocketSkeleton(pocket[0]));
};

const getSumActiveNeighborsGeneric = (pocket, coords, currentCoords = []) => {
    let sum = 0;
    if (!Array.isArray(pocket)) {
        const element = pocket;
        const isSameCoords = coords.every((coord, index) => coord === currentCoords[index]);
        const isActiveCase = element === '#';
        if (!isSameCoords && isActiveCase) {
            return 1;
        }
        return 0;
    }
    const coord = coords[currentCoords.length];
    for (let index = coord - 1; index <= coord + 1; index += 1) {
        const element = pocket[index];
        if (!element) {
            continue;
        }
        sum += getSumActiveNeighborsGeneric(pocket[index], coords, [...currentCoords, index]);
    }
    return sum;
};

const getArrayDepth = (value) => (Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0);
const setState = (pocket, coords, state) => {
    const args = coords.reduce((acc, coord) => `${acc}[${coord}]`, '');
    eval(`pocket${args}=state`);
};

const isActiveStateGeneric = (coords, pocket) => {
    let currentCoords = '';
    for (let index = 0; index < coords.length; index += 1) {
        const coord = coords[index];
        currentCoords = `${currentCoords}[${coord}]`;
        const exist = eval(`pocket${currentCoords}`);
        if (!exist) {
            return false;
        }

        if (index === coords.length - 1) {
            return eval(`pocket${currentCoords} === "#"`);
        }
    }
};
