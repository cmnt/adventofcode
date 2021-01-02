const [year, day] = [process.argv[2], process.argv[3]];

// eslint-disable-next-line import/no-dynamic-require
require(`./${year}/day${day}.js`);
