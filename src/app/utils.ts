export function randint(max: number, min: number = 0): number {
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // "The maximum is exclusive and the minimum is inclusive"
    return Math.floor(Math.random()*(Math.floor(max)-Math.ceil(min)+Math.ceil(min)))
}

export function printPercent(n: number) {
    return String(Math.round(n*100)) + "%"
}