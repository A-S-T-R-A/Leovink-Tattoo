export function getColumnsNumber(width: number): number {
    switch (true) {
        case width > 1000:
            return 5
        case width > 768:
            return 4
        default:
            return 3
    }
}
