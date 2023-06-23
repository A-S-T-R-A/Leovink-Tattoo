//shallow comparison of two objects
export function isShallowEqual(obj1: any, obj2: any): boolean {
    // Check if the objects are strictly equal
    if (obj1 === obj2) {
        return true
    }

    // Get the keys of the objects
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false
    }

    // Check if all the keys and their values are equal
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true
}
