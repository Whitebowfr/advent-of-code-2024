import { day1 } from "./@lib";

function getLists(data: string): [number[], number[]] {
    return [[...data.matchAll(/[0-9]+/gmi)].filter((x, i) => i % 2 == 0).map(x => Number(x)), [...data.matchAll(/[0-9]+/gmi)].filter((x, i) => i % 2 == 1).map(x => Number(x))]
}

function getDistance(lists: [number[], number[]]): number {
    let dist = 0;
    while (lists[0].length != 0) {
        let min = Math.min(...lists[0])
        let min2 = Math.min(...lists[1])
        lists[0].splice(lists[0].indexOf(min), 1)
        lists[1].splice(lists[1].indexOf(min2), 1)
        dist += Math.abs(min - min2)
    }
    return dist
}

function getSimilarityScore(lists: [number[], number[]]): number {
    return lists[0].map(x => x * lists[1].map(y => Number(y == x)).reduce((a, b) => a + b)).reduce((a, b) => a + b)
}

console.log(getSimilarityScore(getLists(day1)))