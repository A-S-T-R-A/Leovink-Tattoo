import { DISAPPEARING_DELAY, TRANSITION_TIME } from "../../const/const"
import { crossIcon } from "../../svg/crossIcon"
import styles from "./alertConstructor.module.scss"

export function alertConstructor(
    message: string,
    icon: (i: string) => SVGElement,
    text: string,
    variant: string
) {
    const alertContainerEl = document.createElement("div")
    const messageEl = document.createElement("p")
    const strongTextEl = document.createElement("strong")
    const closeIconEl = crossIcon(styles.cross)
    const iconEl = icon(styles.icon)

    strongTextEl.textContent = text
    messageEl.textContent = message

    alertContainerEl.classList.add(styles.container)
    alertContainerEl.classList.add(styles[variant])
    messageEl.classList.add(styles.message)

    alertContainerEl.style.transition = `transform ${TRANSITION_TIME}ms ease`

    alertContainerEl.append(iconEl)
    alertContainerEl.append(strongTextEl)
    alertContainerEl.append(messageEl)
    alertContainerEl.append(closeIconEl)

    document.body.append(alertContainerEl)

    function cleanup(timeout = 0) {
        setTimeout(() => {
            alertContainerEl.classList.remove(styles.appended)
        }, timeout)

        setTimeout(() => {
            alertContainerEl.remove()
        }, timeout + TRANSITION_TIME)
    }

    requestAnimationFrame(() => {
        alertContainerEl.classList.add(styles.appended)
    })

    cleanup(DISAPPEARING_DELAY)

    closeIconEl.onclick = () => cleanup()
}
