const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const getData = async (dayNum) => {
    try {
        return await axios.get(`https://adventofcode.com/2020/day/${dayNum}/input`, {
            headers: {
                cookie: `session=${process.env.SESSION};`
            }
        });
    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    getData
};