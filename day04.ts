import { coords, day4, DirectionalDirectionMarker, Map2D } from "./@lib";

// Please don't look at this code.

// It is truly the worst thing i've ever wrote, I didn't have the time

function parseWordSearch(data: string) {
    return new Map2D(data)
}

function countXMAXoccurences(map: Map2D) {
    let cnt = 0
    map.grid.forEach((row, y) => row.forEach((cell, x) => {
        if (cell == "X") {
            map.getPossibleDirections([x, y], 3, true).forEach(dir => {
            if (map.getNextElement([x, y], dir, 1) == "M" && map.getNextElement([x, y], dir, 2) == "A" && map.getNextElement([x, y], dir, 3) == "S") {
                cnt += 1
                console.log([x,y])
            }
        })}
    }))
    console.log(cnt)
}

function countCrossMASOccurences(map: Map2D) {
    let cnt = 0
    map.grid.forEach((row, y) => row.forEach((cell, x) => {
        if (x > 0 && y>0 && y<map.size[1]-1 && x<map.size[0]-1) {
            if (cell == "A") {
                let a = map.getNextElement([x, y], DirectionalDirectionMarker.NORTHWEST)
                let b = map.getNextElement([x, y], DirectionalDirectionMarker.SOUTHEAST)
                let c = map.getNextElement([x, y], DirectionalDirectionMarker.NORTHEAST)
                let d = map.getNextElement([x, y], DirectionalDirectionMarker.SOUTHWEST)
                if (((a == "M" && b == "S") || (a == "S" && b == "M")) && ((c == "M" && d == "S") || (c == "S" && d == "M"))) {
                    cnt += 1
                }
            }
        }
    }))
    console.log(cnt)
}

console.log(countXMAXoccurences(parseWordSearch(`XMAS
XMAS
XMAS
XMAS`)))