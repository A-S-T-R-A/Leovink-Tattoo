export function findArraysDifference(arr1: string[], arr2: string[]): string[] {
    const result: string[] = []
    const obj: {
        [key: string]: number
    } = {}

    arr1.forEach(item => {
        if (obj[item] !== undefined) {
            obj[item]++
        } else {
            obj[item] = 1
        }
    })

    arr2.forEach(item => {
        if (obj[item] !== undefined) {
            obj[item]++
        } else {
            obj[item] = 1
        }
    })

    Object.entries(obj).forEach(([key, value]) => {
        if (value === 1) {
            result.push(key)
        }
    })
    return result
}
