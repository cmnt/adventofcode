import { describe, test, expect, beforeAll } from 'bun:test'
import ConcretePuzzle from '@/2025/1/solutionDay1'
import input from './input.txt'
const testInput = 'L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82'

describe('SolutionDay1', () => {
    let puzzle: ConcretePuzzle
    beforeAll(() => {
        puzzle = new ConcretePuzzle()
    })

    test('solveFirst should return correct count for simple input', () => {
        puzzle.setInput(testInput)

        const result = puzzle.solveFirst()

        expect(result).toBe(3)
    })

    test('solveSecond should return correct count for simple input', () => {
        puzzle.setInput(testInput)

        const result = puzzle.solveSecond()

        expect(result).toBe(6)
    })

    test('solveSecond should return correct count for specific R51 input', () => {
        puzzle.setInput('R51')

        const result = puzzle.solveSecond()

        expect(result).toBe(1)
    })

    test('solveSecond should return correct count for specific R50\nR100 input', () => {
        puzzle.setInput('R50\nR100')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })

    test('solveSecond should return correct count for specific L51 input', () => {
        puzzle.setInput('L51')

        const result = puzzle.solveSecond()

        expect(result).toBe(1)
    })

    test('solveSecond should return correct count for specific L50\nL100 input', () => {
        puzzle.setInput('L50\nL100')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })


    test('solveSecond should return correct count for specific L50\nL200 input', () => {
        puzzle.setInput('L50\nL200')

        const result = puzzle.solveSecond()

        expect(result).toBe(3)
    })

    test('solveSecond should return correct count for specific L100 input', () => {
        puzzle.setInput('L100')

        const result = puzzle.solveSecond()

        expect(result).toBe(1)
    })

    test('solveSecond should return correct count for specific L150 input', () => {
        puzzle.setInput('L150')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })

    test('solveSecond should return correct count for specific L250 input', () => {
        puzzle.setInput('L250')

        const result = puzzle.solveSecond()

        expect(result).toBe(3)
    })

    test('solveSecond should return correct count for specific L249 input', () => {
        puzzle.setInput('L249')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })

    test('solveSecond should return correct count for specific L50\nL1 input', () => {
        puzzle.setInput('L50\nL1')

        const result = puzzle.solveSecond()

        expect(result).toBe(1)
    })

    test('solveSecond should return correct count for specific L50\nL1\nR1 input', () => {
        puzzle.setInput('L50\nL1\nR1')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })

    test('solveSecond should return correct count for specific R49\nL99\nL1\nR1 input', () => {
        puzzle.setInput('R49\nL99\nL1\nR1')

        const result = puzzle.solveSecond()

        expect(result).toBe(2)
    })

})
