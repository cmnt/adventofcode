const { getData, formatToArray } = require('../common/input');

(async () => {
  const { data } = await getData(2021, 1)
  const puzzle = formatToArray(data, 'int')
  console.log(resultPart1(puzzle))
  console.log(resultPart2(puzzle))
})()

const resultPart1 = (puzzle) => getNumIncreasing(puzzle)

const getNumIncreasing = (puzzle) => {
  const [first, ...restPuzzle] = puzzle
  const res = restPuzzle.reduce((acc, curr) => {
    if (curr > acc.prev) {
      acc.increases += 1
    }
    acc.prev = curr
    return acc
  }, { prev: first, increases: 0 })

  return res.increases
}

// Part 2
const resultPart2 = (puzzle) => getNumIncreasing(getTripleSum(puzzle))

const getTripleSum = (puzzle) => puzzle.reduce((acc, curr, index, array) => {
  const indexPrev = index - 1
  const indexNext = index + 1

  if (indexPrev < 0 || indexNext >= array.length) {
    return acc
  }

  const prev = array[indexPrev]
  const next = array[indexNext]
  return [...acc, prev + curr + next]
}, [])
