export function getImageNameByUrl(url: string): string {
    const startIndex = url.lastIndexOf("%2F") + 3
    const endIndex = url.indexOf("?")
    const extractedParam = url.substring(startIndex, endIndex)

    return extractedParam
}
