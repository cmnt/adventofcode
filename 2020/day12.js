const {
    getData
} = require("./input");

(async () => {
    const data = await getData(12);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;
    const test = ['F10', 'N3', 'F7', 'R90', 'F11'];
    // console.log(puzzle);
    // console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})()

const resultPart1 = (puzzle) => {
    const ship = new Ship(90, false);
    ship.execInstructions(puzzle)
    return ship.getManhattanDistance()
}

const resultPart2 = (puzzle) => {
    const ship = new Ship(0, true);
    ship.execInstructions(puzzle)
    return ship.getManhattanDistance()
}


class Ship {
    constructor(facing, isWaypoint) {
        this.facing = facing;
        this.northDistance = 0;
        this.eastDistance = 0;
        this.isWaypoint = isWaypoint;
        this.waypoint = {
            north: 1,
            east: 10
        }
    }

    execInstructions(instructions) {
        instructions.map((instruction) => {
            this.execInstruction(instruction);
        });
    }

    execInstruction(instruction) {
        const action = instruction.slice(0, 1);
        const value = parseInt(instruction.slice(1));

        if (action === 'F') {
            this.isWaypoint ? this.go(value) : this.setDistance(this.getFrontOrientation(), value);
            return;
        }

        if (['E', 'W', 'N', 'S'].includes(action)) {
            this.isWaypoint ? this.setDistanceWaypoint(action, value) : this.setDistance(action, value);
            return;
        }

        this.rotation(instruction);
    }

    getManhattanDistance() {
        return Math.abs(this.eastDistance) + Math.abs(this.northDistance);
    }

    go(value) {
        const northWaypointOrientation = this.getFrontOrientation();
        const eastWaypointOrientation = this.getFrontOrientation(90);

        this.setDistance(northWaypointOrientation, value * this.waypoint.north);
        this.setDistance(eastWaypointOrientation, value * this.waypoint.east);
    }

    getFrontOrientation(base = 0) {
        if (this.facing + base === 0) return 'N';
        if (this.facing + base === 90) return 'E';
        if (this.facing + base === 180) return 'S';
        if (this.facing + base === 270) return 'W';
    }

    setDistance(action, value) {
        switch (action) {
            case 'E':
                this.eastDistance += value;
                break;
            case 'W':
                this.eastDistance -= value;
                break;
            case 'N':
                this.northDistance += value;
                break;
            case 'S':
                this.northDistance -= value;
                break;
        }
    }

    setDistanceWaypoint(action, value) {
        switch (action) {
            case 'E':
                this.waypoint.east += value;
                break;
            case 'W':
                this.waypoint.east -= value;
                break;
            case 'N':
                this.waypoint.north += value;
                break;
            case 'S':
                this.waypoint.north -= value;
                break;
        }
    }

    rotation(instruction) {
        let value;

        switch (instruction) {
            case 'L90':
                value = 270;
                break;
            case 'L180':
                value = 180;
                break;
            case 'L270':
                value = 90;
                break;
            default:
                value = parseInt(instruction.slice(1));
        }
        this.facing = (this.facing + value) % 360;

    }
}