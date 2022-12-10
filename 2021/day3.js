const { getData, formatToArray } = require('../common/input');

(async () => {
    const { data } = await getData(2021, 3)
    const puzzle = formatToArray(data)
    console.log(resultPart1(puzzle))
    // console.log(resultPart2(puzzle))
})()

const resultPart1 = (puzzle) => {
    const diff = computeBinaireDiff(puzzle)
    console.log(diff)
    const gamaBinArray = diff.map((diffBit) => (diffBit > 0 ? 1 : 0))
    const epsiBinArray = gamaBinArray.map((bit) => (bit ? 0 : 1))

    return binArrayToDec(gamaBinArray) * binArrayToDec(epsiBinArray)
}

const computeBinaireDiff = (puzzle) => puzzle.reduce((acc, curr) => {
    [...curr].map((char, i) => { acc[i] = char === '1' ? acc[i] + 1 : acc[i] - 1 })
    return acc
}, (new Array(puzzle[0].length).fill(0)))

const binArrayToDec = (binArray) => parseInt(Number(binArray.join('')), 2)

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
