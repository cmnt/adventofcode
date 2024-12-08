 const { getData } = require('./input');

(async () => {
    const data = await getData(12);
    const puzzle = data.data.split('\n');
    puzzle.length -= 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})();

const resultPart1 = (puzzle) => {
    const ship = new Ship(90, false);
    ship.execInstructions(puzzle);
    return ship.getManhattanDistance();
};

const resultPart2 = (puzzle) => {
    const ship = new Ship(0, true);
    ship.execInstructions(puzzle);
    return ship.getManhattanDistance();
};

class Ship {
    constructor(facing, isWaypoint) {
        this.facing = facing;
        this.northDistance = 0;
        this.eastDistance = 0;
        this.isWaypoint = isWaypoint;
        this.waypoint = {
            north: 1,
            east: 10,
        };
    }

    execInstructions(instructions) {
        instructions.map((instruction) => {
            this.execInstruction(instruction);
        });
    }

    execInstruction(instruction) {
        const action = instruction.slice(0, 1);
        const value = parseInt(instruction.slice(1), 10);

        if (action === 'F') {
            this.isWaypoint ? this.go(value) : this.setDistance(this.getOrientation(), value);
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
        const northWaypointOrientation = this.getOrientation();
        const eastWaypointOrientation = this.getOrientation(90);

        this.setDistance(northWaypointOrientation, value * this.waypoint.north);
        this.setDistance(eastWaypointOrientation, value * this.waypoint.east);
    }

     
    getOrientation(base = 0) {
        const orientation = (this.facing + base) % 360;
        if (orientation === 0) return 'N';
        if (orientation === 90) return 'E';
        if (orientation === 180) return 'S';
        if (orientation === 270) return 'W';
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
            default:
        }
    }

    setDistanceWaypoint(action, value) {
        const orientation = this.getOrientation();
        switch (action) {
            case 'E':
                if (orientation === 'N') {
                    this.waypoint.east += value;
                } else
                if (orientation === 'E') {
                    this.waypoint.north += value;
                } else
                if (orientation === 'S') {
                    this.waypoint.east -= value;
                } else
                if (orientation === 'W') {
                    this.waypoint.north -= value;
                }

                break;
            case 'W':
                if (orientation === 'N') {
                    this.waypoint.east -= value;
                } else
                if (orientation === 'E') {
                    this.waypoint.north -= value;
                } else
                if (orientation === 'S') {
                    this.waypoint.east += value;
                } else
                if (orientation === 'W') {
                    this.waypoint.north += value;
                }
                break;
            case 'N':
                if (orientation === 'N') {
                    this.waypoint.north += value;
                } else
                if (orientation === 'E') {
                    this.waypoint.east -= value;
                } else
                if (orientation === 'S') {
                    this.waypoint.north -= value;
                } else
                if (orientation === 'W') {
                    this.waypoint.east += value;
                }
                break;
            case 'S':
                if (orientation === 'N') {
                    this.waypoint.north -= value;
                } else
                if (orientation === 'E') {
                    this.waypoint.east += value;
                } else
                if (orientation === 'S') {
                    this.waypoint.north += value;
                } else
                if (orientation === 'W') {
                    this.waypoint.east -= value;
                }
                break;
            default:
        }
    }

    rotation(instruction) {
        let value;

        switch (instruction) {
            case 'L90':
                value = 270;
                break;
            case 'L270':
                value = 90;
                break;
            default:
                value = parseInt(instruction.slice(1), 10);
        }
        this.facing = (this.facing + value) % 360;
    }
}
