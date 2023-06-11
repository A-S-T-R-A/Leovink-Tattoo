export const disableUi = {
    disable() {
        document.body.style.pointerEvents = "none"
    },
    enable() {
        document.body.style.pointerEvents = "auto"
    },
}
