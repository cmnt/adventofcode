const { getData, formatToArray } = require('../common/input');

(async () => {
    const { data } = await getData(2021, 2)
    const puzzle = formatToArray(data)
    console.log(resultPart1(puzzle))
    console.log(resultPart2(puzzle))
})()

const resultPart1 = (puzzle) => computeFinalPosition(puzzle).reduce((acc, curr) => acc * curr, 1)

const computeFinalPosition = (puzzle) => puzzle.reduce((acc, curr) => {
    const value = parseInt(curr.slice(-1))
    if (curr.startsWith('forward')) {
        acc[0] += value
    } else if (curr.startsWith('up')) {
        acc[1] -= value
    } else if (curr.startsWith('down')) {
        acc[1] += value
    } else {
        console.log('error')
    }
    return acc
}, [0, 0])

// Part 2
const resultPart2 = (puzzle) => {
    const [horizontal, depth] = computeFinalPositionWithAim(puzzle)
    return horizontal * depth
}

const computeFinalPositionWithAim = (puzzle) => puzzle.reduce((acc, curr) => {
    const value = parseInt(curr.slice(-1))
    let [horizontal, depth, aim] = acc
    if (curr.startsWith('forward')) {
        horizontal += value
        depth += value * aim
    } else if (curr.startsWith('up')) {
        aim -= value
    } else if (curr.startsWith('down')) {
        aim += value
    } else {
        console.log('error')
    }
    return [horizontal, depth, aim]
}, [0, 0, 0])
