# Advent of Code

Solving [Advent of Code](http://adventofcode.com) puzzles using Bun.

## Prerequisites

- [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime. Follow the [installation guide](https://bun.sh/docs/installation) to install Bun.

## Setup

1. Clone the repository:

```sh
git clone https://github.com/cmnt/adventofcode.git
cd advent-of-code
```

2. Install dependencies:

```sh
bun install
```

3. Create a `.env` file based on the provided `.env.example`:
```sh
cp .env.example .env
```

4. Set the environment variables:
```env
SESSION=your-cookie-session
```

## Run
To run the solution for a specific year and day, use the following command:
```sh
bun run start <year> <day>
```
This will create the following directory structure if it does not already exist:

- initialize a file to write the solution if it does not already exist in the path ./src/\<year\>/\<day\>
- download the input for the specified date.
- execute the solutions for the specified date.

### Example
To run the solution for 2024, day 9 :
```sh
bun run start 2024 9
```
This will create the following directory structure if it does not already exist:
```sh
src/
└── 2024/
    └── 9/
        ├── solutionDay9.ts # File to modify with your solution
        └── input.txt       # Advent of Code puzzle input
```
and display the result of the solutions:
```sh
> bun run start 2024 9
First solution: solution 1  # Default output
Second solution: solution 2 # Default output
```

## Licence
This project is licensed under the MIT License.

