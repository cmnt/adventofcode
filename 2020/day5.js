const {
    getData
} = require("./input");

(async () => {
    const data = await getData(5);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})()

// get highest seatID
const resultPart1 = (puzzle) => {
    const seatIds = puzzle.map(boardingPass => getSeatId(boardingPass));
    return Math.max(...seatIds)
}

const resultPart2 = (puzzle) => {
    return getMissingSeats(puzzle);
}

const getMissingSeats = (puzzle) => {
    const seatIds = puzzle.map(boardingPass => getSeatId(boardingPass));
    const nearSeatUnder = seatIds.find((seat) => seatIds.includes(seat + 2) && !seatIds.includes(seat + 1));

    return nearSeatUnder + 1;
}

const getSeatId = (boardingPass) => {
    const rowCode = boardingPass.slice(0, 7);
    const columnCode = boardingPass.slice(-3);

    return getRow(rowCode) * 8 + getColumn(columnCode);
}

const getRow = (rowCode) => {
    return rowCode.split('').reduce((range, code) => {
        const diff = (range[1] - range[0] + 1) / 2;
        if (code === 'F') {
            return [range[0], range[1] - diff];
        } else {
            return [range[0] + diff, range[1]];
        }
    }, [0, 127])[0]
}

const getColumn = (columnCode) => {
    return columnCode.split('').reduce((range, code) => {
        const diff = (range[1] - range[0] + 1) / 2;
        if (code === 'L') {
            return [range[0], range[1] - diff];
        } else {
            return [range[0] + diff, range[1]];
        }
    }, [0, 7])[0]
}