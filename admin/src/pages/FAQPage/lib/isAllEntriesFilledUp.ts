export function isAllEntriesFilledUp(data: any) {
    for (const question of Object.values(data as any)) {
        for (const key in question as any) {
            const q = question as any
            if (q[key] === "") return false
        }
    }
    return true
}
