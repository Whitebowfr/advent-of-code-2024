import { coords, DirectionalDirectionMarker, DirectionMarker, updateCoords } from "../vectors";

export class Map2D {
    grid: any[][];
    size: [number, number];

    constructor(grid?: any[][]|string, size?: [number, number], delimiter="") {
        
        if (grid) {
            if (typeof grid === "string") {
                this.grid = grid.split("\n").map(x => x.split(delimiter))
            } else {
                this.grid = grid
            }
            
            if (typeof size === "undefined") {
                this.size = [this.grid[0].length, this.grid.length]
            } else {
                this.size = size
            }
        } else {
            if (typeof size === "undefined") {
                throw Error("Size not defined on empty grid")
                return
            } else {
                this.size = size
            }

            let grid = []
            for (let index = 0; index < this.size[1]; index++) {
                let row = []
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    row.push(0)
                }
                grid.push(row)
            }
            this.grid = grid
        }
    }

    getElement(coords: number|[number, number], coordsY?: number) {
        if (typeof coords === "number") {
            if (coordsY) {
                return this.grid[coordsY][coords]
            }
        } else {
            return this.grid[coords[1]][coords[0]]
        }
    }

    getNextElement(coords: [number, number], direction: DirectionMarker|DirectionalDirectionMarker, distance?: number) {
        distance = distance ?? 1;
        let newCoords: coords = updateCoords(coords, direction, distance)
        if (!this.isInGrid(newCoords)) {
            throw new Error("New coordinates are outside of the grid");
        }
        return this.getElement(updateCoords(coords, direction, distance))
    }

    setElement(coords: [number, number], value: any) {
        this.grid[coords[1]][coords[0]] = value
    }

    isInGrid(coords: coords): boolean {
        return !(coords[0] < 0 || coords[0] >= this.size[0] || coords[1] < 0 || coords[1] >= this.size[1])
    }

    fillGrid(value: any|any[][]) {
        if (typeof value === "object" && value.length === this.size[1] && value[0].length === this.size[0]) {
            for (let index = 0; index < this.size[1]; index++) {
                const element = this.grid[index];
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value[index][index2]
                }
            }
        } else {
            for (let index = 0; index < this.size[1]; index++) {
                const element = this.grid[index];
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value
                }
            }
        }
    }

    getPossibleDirections(coords: coords, lengthToSearch?: number, getDiagonals?:boolean): (DirectionMarker|DirectionalDirectionMarker)[] {
        lengthToSearch = lengthToSearch ?? 1;
        getDiagonals = getDiagonals ?? true;

        let availableDirections: (DirectionMarker|DirectionalDirectionMarker)[] = []
        for (const [key, value] of Object.entries(DirectionMarker)) {
            if (this.isInGrid(updateCoords(coords, value, lengthToSearch))) {
                availableDirections.push(value)
            }
        }
        
        if (getDiagonals) {
            for (const [key, value] of Object.entries(DirectionalDirectionMarker)) {
                if (this.isInGrid(updateCoords(coords, value, lengthToSearch))) {
                    availableDirections.push(value)
                }
            }
        }

        return availableDirections
    }
}