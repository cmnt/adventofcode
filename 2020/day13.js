const { getData } = require('./input');

(async () => {
    const data = await getData(13);
    const puzzle = data.data.split('\n');
    puzzle.length -= 1;
    console.log(resultPart1(puzzle));
    console.log(`part 2 example : ${resultPart2(puzzle)}`);
})();

const resultPart1 = (puzzle) => {
    const earliestTime = parseInt(puzzle[0]);
    const buses = getBusesFromPuzzle(puzzle);
    const busesNextDepart = buses.map((id) => ({
        nextDepart: getNearestTimeFromIdBus(id, earliestTime),
        bus: id,
    })).sort((a, b) => a.nextDepart - b.nextDepart);

    const {
        nextDepart,
        bus,
    } = busesNextDepart[0];

    const timeToWait = nextDepart - earliestTime;

    return timeToWait * bus;
};

const resultPart2 = (puzzle) => {
    const buses = getBusesFromPuzzleWithIndex(['', '67,x,7,59,61']);
    // const buses = getBusesFromPuzzleWithIndex(puzzle);
    const highestBus = buses.reduce((highestBus, bus) => {
        if (bus.id > highestBus.id) {
            return bus;
        }
        return highestBus;
    }, buses[0]);
    let timestamp = 0;
    let isGoodTimestamp = false;

    const checkIsGoodTimestamp = (timestamp) => buses.every((bus) => isMultipleOf(timestamp - highestBus.index + bus.index, bus.id));

    while (!isGoodTimestamp) {
        timestamp += highestBus.id;
        isGoodTimestamp = checkIsGoodTimestamp(timestamp);

        return timestamp - highestBus.index;
    }
};

const getBusesFromPuzzle = (puzzle) => puzzle[1].split(',').filter((id) => id !== 'x').map(Number);

const getNearestTimeFromIdBus = (idBus, earliestTime) => Math.ceil(earliestTime / idBus) * idBus;

const isMultipleOf = (numberMultiple, num) => numberMultiple % num === 0;

const getBusesFromPuzzleWithIndex = (puzzle) => puzzle[1].split(',').reduce((buses, id, index) => {
    const idParse = parseInt(id);
    if (idParse) {
        buses.push({
            id: idParse,
            index,
        });
    }
    return buses;
}, []);
