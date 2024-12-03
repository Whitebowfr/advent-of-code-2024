import { day3 } from "./@lib"

function getMultiplicationWithoutCorruptedCharacters(data: string): number {
    return [...data.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/gm)].map(x => Number(x[0].split(",")[0].replace("mul(","")) * Number(x[0].split(",")[1].replace(")",""))).reduce((a, b) => a + b)
}

function disableInstructions(data: string): number {
    return getMultiplicationWithoutCorruptedCharacters(data.replaceAll(/don't\(\).*?do\(\)/gm, "").split("don't()")[0])
}

console.log(disableInstructions(day3))