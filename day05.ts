import { day5, getCommonItems, parseAsInts } from "./@lib";

interface commands {
    firstSection: number[][],
    secondSection: number[][]
}

function parseInputs(data: string): commands {
    let part1 = data.split("\n\n")[0]
    let pt1parsed = part1.split("\n").map(x => parseAsInts(x.split("|")))
    let part2 = data.split("\n\n")[1]
    let pt2parsed = part2.split("\n").map(x => parseAsInts(x.split(",")))
    return {
        firstSection: pt1parsed, 
        secondSection: pt2parsed
    }
}

function getRulesOfNumber(data: commands, page: number): number[] {
    return data.firstSection.filter((rule) => rule[0] == page).map((x) => x[1])
}

function getMiddlePages(data: commands) {
    let cnt = 0
    for (let update of data.secondSection) {
        let pages = update
        for (let i = 0; i < update.length-1; i++) {
            let numberOfPagesAfter = getCommonItems(false, update.slice(i), getRulesOfNumber(data, update[i]))
            if (numberOfPagesAfter.length !== update.length - i - 1) {
                pages = []
                break;
            }
        }
        if (pages.length > 0) {
            cnt += pages[Math.floor(pages.length / 2)]
        }
    }
    console.log(cnt)
}

function isOrderCorrect(data: commands, arr: number[]) : boolean {
    return arr.every((x, i) => getCommonItems(false, arr.slice(i), getRulesOfNumber(data, x)).length === arr.length - i - 1)
}

function getCorrectedMiddlePages(data: commands) {
    let cnt = 0
    for (let update of data.secondSection) {
        if (!isOrderCorrect(data, update)) {
            let newAr = reArrangeOrders(data, update)
            cnt += newAr[Math.floor(newAr.length / 2)]
        }
    }
    console.log(cnt)
}

function reArrangeOrders(data: commands, arr: number[]) {
    let newAr = []
    let oldArr = [...arr]
    while (newAr.length != arr.length) {
        for (let j = 0; j < oldArr.length; j++) {
            if (getCommonItems(false, oldArr, getRulesOfNumber(data,oldArr[j])).length == newAr.length) {
                newAr.push(oldArr[j])
                break
            }
        }
    }
        
    return newAr
}

getCorrectedMiddlePages(parseInputs(day5))