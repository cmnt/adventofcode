import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const getData = async (year: string, dayNum: string) => {
    try {
        return await axios.get(`https://adventofcode.com/${year}/day/${dayNum}/input`, {
            headers: {
                cookie: `session=${process.env.SESSION};`,
            },
        })
    } catch (e) {
        console.log(e)
    }
}

export const formatToArray = (input: string, type: string) => input.trim().split('\n').map((text) => {
    if (type === 'int') {
        return parseInt(text)
    }
    return text
})

