import { day2 } from "./@lib";

function parseReports(data: string): number[][] {
    return data.split("\n").map(x => [...x.matchAll(/[0-9]+/g)].map(y => Number(y)))
}

function getSafeReports(reports: number[][]) {
    return reports.map(report => report
                            .map((level, i) => (i == 0 ? 0 : level - report[i-1]))
                            .every((diff, i, arr) => i == 0 || (Math.abs(diff) <= 3 && diff * arr[1] >= 1)))
                    .map(x => Number(x))
                    .reduce((a,b) => a + b)
}

function getFirstError(report: number[]): number {
    // Returns index of first error
    return report.map((level, i) => (i == 0 ? 0 : level - report[i-1])).map((diff, i, arr) => i == 0 || (Math.abs(diff) <= 3 && diff * arr[1] >= 1)).indexOf(false)
}

// This function didn't work so I made a simpler (dumber) one, leaving the old one here just in case
// The problem is when the first element is the error, the index thing doesn't work.
// function getSafeReportsWithProblemDampener(reports: number[][], isFirstTry=false) {
//     return reports.map(report => 
//         (getFirstError(report) < 0 
//           || getFirstError(report.filter((_, i) => i != getFirstError(report))) < 0 
//           || getFirstError(report.filter((_, i) => i + 1 != getFirstError(report))) < 0))
//      .map(x => Number(x))
//      .reduce((a,b) => a + b)
// }

function getSafeReportsWithProblemDampener(reports: number[][]) {
    let count = 0
    let safeReports: number[][] = []
    for (let i = 0; i < reports.length; i++) {
        let arr = [...reports[i]]
        for (let k=0; k < arr.length; k++) {
            let newArr = arr.filter((_,j) => j != k)
            if (getFirstError(newArr) < 0) {
                safeReports.push(reports[i])
                count += 1
                break;
            }
        }
    }
    return safeReports
}
