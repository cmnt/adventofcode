const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

// eslint-disable-next-line consistent-return
const getData = async (year, dayNum) => {
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

const formatToIntArray = (input) => input.trim().split('\n').map((text) => parseInt(text))

module.exports = {
    getData,
    formatToIntArray,
}
