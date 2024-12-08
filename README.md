# Advent of Code

Solving [Advent of Code](http://adventofcode.com) puzzles using Bun.

## Prerequisites

- [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime. Follow the [installation guide](https://bun.sh/docs/installation) to install Bun.

## Setup

1. Clone the repository :

```sh
git clone https://github.com/your-username/advent-of-code.git
cd advent-of-code
```

2. Install dependencies :

```sh
bun install
```

3. Create a .env file based on the provided .env.example :
```env
SESSION=your-session-token-adventofcode
```

## Run
To run the solution for a specific year and day, use the following command :
```sh
bun run start <year> <day>
```
This command will initialize a file to write the solution if it does not already exist in the path ./src/year/day and download the input for the specified date.

### Example
To run the solution for 2024, day 9 :
```sh
bun run start 2024 9
```

## Licence
This project is licensed under the MIT License.

