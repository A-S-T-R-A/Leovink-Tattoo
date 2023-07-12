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
    const messageContainerEl = document.createElement("div")
    const strongTitleEl = document.createElement("strong")
    const messageEl = document.createElement("p")
    const closeIconEl = crossIcon(styles.cross)
    const iconEl = icon(styles.icon)

    strongTitleEl.textContent = text + " "
    messageEl.textContent = message
    messageContainerEl.append(strongTitleEl)
    messageContainerEl.append(messageEl)

    alertContainerEl.classList.add(styles.container)
    alertContainerEl.classList.add(styles[variant])
    messageContainerEl.classList.add(styles.message)

    alertContainerEl.style.transition = `transform ${TRANSITION_TIME}ms ease`

    alertContainerEl.append(iconEl)
    alertContainerEl.append(messageContainerEl)
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
