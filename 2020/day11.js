const { getData } = require('./input');

(async () => {
    const data = await getData(11);
    const puzzle = data.data.split('\n').map((line) => line.split(''));
    puzzle.length -= 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})();

const resultPart1 = (puzzle) => computeRoundAndGetNumberOccupiedSeat(puzzle, true);

const resultPart2 = (puzzle) => computeRoundAndGetNumberOccupiedSeat(puzzle, false);

const computeRoundAndGetNumberOccupiedSeat = (seats, isJustNearNeighbour = true) => {
    let isSame = false;
    let newSeats = seats;

    while (!isSame) {
        [newSeats, isSame] = computeRound(newSeats, isJustNearNeighbour);
    }
    return getNumberOccupiedSeat(newSeats);
};

const getNumberOccupiedSeat = (seats) => seats.reduce((sum, line) => sum + line.reduce((s, seat) => (seat === '#' ? s + 1 : s), 0), 0);

const computeRound = (allSeats, isJustNearNeighbour) => {
    const newSeats = JSON.parse(JSON.stringify(allSeats));
    let isSame = true;

    for (let posY = 0; posY < allSeats.length; posY += 1) {
        for (let posX = 0; posX < allSeats[0].length; posX += 1) {
            if (newSeats[posY][posX] === '.') continue;

            newSeats[posY][posX] = getNewPos(allSeats, [posY, posX], isJustNearNeighbour);

            if (newSeats[posY][posX] !== allSeats[posY][posX]) {
                isSame = false;
            }
        }
    }
    return [newSeats, isSame];
};

const getNewPos = (allSeats, pos, isJustNearNeighbour) => {
    const [posY, posX] = pos;
    const sumOccupiedNeighbour = isJustNearNeighbour ? getNeighboursJustNear(allSeats, pos) : getNeighboursSeen(allSeats, pos);

    if (sumOccupiedNeighbour === 0) {
        return '#';
    }

    const limit = isJustNearNeighbour ? 4 : 5;

    if (sumOccupiedNeighbour >= limit) {
        return 'L';
    }

    return allSeats[posY][posX];
};

const getNeighboursJustNear = (allSeats, pos) => {
    const [posY, posX] = pos;
    let sumOccupiedNeighbour = 0;
    for (let indexY = posY - 1; indexY <= posY + 1; indexY += 1) {
        for (let indexX = posX - 1; indexX <= posX + 1; indexX += 1) {
            const isValidRange = indexX >= 0 && indexX < allSeats[0].length && indexY >= 0 && indexY < allSeats.length;
            const isOriginSeat = indexX === posX && indexY === posY;
            if (!isValidRange || isOriginSeat) {
                continue;
            }

            if (allSeats[indexY][indexX] === '#') {
                sumOccupiedNeighbour += 1;
            }
        }
    }
    return sumOccupiedNeighbour;
};

const getNeighboursSeen = (allSeats, pos) => {
    const [posY, posX] = pos;
    const neighbours = Array(8).fill(false);
    const endSeens = Array(8).fill(false);
    const [isTop, isTopRight, isRight, isBottomRight, isBottom, isBottomLeft, isLeft, isTopLeft] = [0, 1, 2, 3, 4, 5, 6, 7];
    let round = 1;

    while (neighbours.filter(Boolean).length + endSeens.filter(Boolean).length !== 8) {
        // top
        if (!neighbours[isTop] && !endSeens[isTop]) {
            if (posY - round < 0) {
                endSeens[isTop] = true;
            } else if (allSeats[posY - round][posX] === '#') {
                neighbours[isTop] = true;
            } else if (allSeats[posY - round][posX] === 'L') {
                endSeens[isTop] = true;
            }
        }

        // top right
        if (!neighbours[isTopRight] && !endSeens[isTopRight]) {
            if (posY - round < 0 || posX + round >= allSeats[0].length) {
                endSeens[isTopRight] = true;
            } else if (allSeats[posY - round][posX + round] === '#') {
                neighbours[isTopRight] = true;
            } else if (allSeats[posY - round][posX + round] === 'L') {
                endSeens[isTopRight] = true;
            }
        }

        // right
        if (!neighbours[isRight] && !endSeens[isRight]) {
            if (posX + round >= allSeats[0].length) {
                endSeens[isRight] = true;
            } else if (allSeats[posY][posX + round] === '#') {
                neighbours[isRight] = true;
            } else if (allSeats[posY][posX + round] === 'L') {
                endSeens[isRight] = true;
            }
        }

        // bottom right
        if (!neighbours[isBottomRight] && !endSeens[isBottomRight]) {
            if (posY + round >= allSeats.length || posX + round >= allSeats[0].length) {
                endSeens[isBottomRight] = true;
            } else if (allSeats[posY + round][posX + round] === '#') {
                neighbours[isBottomRight] = true;
            } else if (allSeats[posY + round][posX + round] === 'L') {
                endSeens[isBottomRight] = true;
            }
        }

        // bottom
        if (!neighbours[isBottom] && !endSeens[isBottom]) {
            if (posY + round >= allSeats.length) {
                endSeens[isBottom] = true;
            } else if (allSeats[posY + round][posX] === '#') {
                neighbours[isBottom] = true;
            } else if (allSeats[posY + round][posX] === 'L') {
                endSeens[isBottom] = true;
            }
        }

        // bottom left
        if (!neighbours[isBottomLeft] && !endSeens[isBottomLeft]) {
            if (posY + round >= allSeats.length || posX - round < 0) {
                endSeens[isBottomLeft] = true;
            } else if (allSeats[posY + round][posX - round] === '#') {
                neighbours[isBottomLeft] = true;
            } else if (allSeats[posY + round][posX - round] === 'L') {
                endSeens[isBottomLeft] = true;
            }
        }

        // left
        if (!neighbours[isLeft] && !endSeens[isLeft]) {
            if (posX - round < 0) {
                endSeens[isLeft] = true;
            } else if (allSeats[posY][posX - round] === '#') {
                neighbours[isLeft] = true;
            } else if (allSeats[posY][posX - round] === 'L') {
                endSeens[isLeft] = true;
            }
        }

        // top left
        if (!neighbours[isTopLeft] && !endSeens[isTopLeft]) {
            if (posY - round < 0 || posX - round < 0) {
                endSeens[isTopLeft] = true;
            } else if (allSeats[posY - round][posX - round] === '#') {
                neighbours[isTopLeft] = true;
            } else if (allSeats[posY - round][posX - round] === 'L') {
                endSeens[isTopLeft] = true;
            }
        }

        round += 1;
    }

    return neighbours.filter(Boolean).length;
};
