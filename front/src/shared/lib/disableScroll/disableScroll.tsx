export function disableScroll(isClosed: boolean) {
    document.body.style.overflowY = isClosed ? "hidden" : "auto"
}
