export function isStringUrlFriendly(s: string): boolean {
    const pattern = /^[a-z0-9_-]*$/
    return pattern.test(s)
}
