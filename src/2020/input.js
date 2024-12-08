
const getData = async (dayNum) => {
  try {
    return await fetch.get(`https://adventofcode.com/2020/day/${dayNum}/input`, {
      headers: {
        cookie: `session=${process.env.SESSION};`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getData,
};
