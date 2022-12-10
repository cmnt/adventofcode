import * as fs from 'fs'
import { getData } from './common/input'

import SolutionFactory from './common/SolutionFactory'

const [year, day] = [process.argv[2], process.argv[3]]

// Init directory and files
const init = async () => {
if (!fs.existsSync(`./${year}`)) {
    fs.mkdirSync(`./${year}`)
}

if (!fs.existsSync(`./${year}/${day}`)) {
    fs.mkdirSync(`./${year}/${day}`)
}

if (!fs.existsSync(`./${year}/${day}/solutionDay${day}.ts`)) {
    fs.copyFile('./common/template/solution-template.ts', `./${year}/${day}/solutionDay${day}.ts`,
        (err) => {
            if (err) throw err
            console.log(`./${year}/${day}/solutionDay${day}.ts was copied to destination`)
        })
}

if (!fs.existsSync(`./${year}/${day}/input.txt`)) {
    await getData(year, day).then(({ data }) => fs.writeFileSync(`./${year}/${day}/input.txt`, data))
}
}

// Execute solution
const execute = async () => {
    const puzzle = await SolutionFactory.getPuzzle(year, day)
    console.log('puzzle done');
    
    console.log(puzzle.display())
}

(async () => {
    await init()    
    execute()
})()
