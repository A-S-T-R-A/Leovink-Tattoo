export function getMaximumColumnHeight(containerRef: HTMLDivElement | null, columns = 5): number {
    if (!containerRef) return 50000

    const arr = Array(columns).fill(0)
    Array.from(containerRef.children)
        .slice(0, -4)
        .forEach((item, index) => {
            const img = item.children[0] as HTMLImageElement
            arr[index % columns] += img.height + 8
        })

    return Math.max(...arr)
}
