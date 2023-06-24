import {
    AUTO_DISAPPEARING_DELAY,
    CLOSING_ANIMATION_DELAY,
    DISAPPEARING_DELAY,
} from "../../const/const"
import { infoIcon } from "../../svg/infoIcon"
import { crossIcon } from "../../svg/crossIcon"
import styles from "./infoAlert.module.scss"

export function infoAlert(message: string) {
    const alertContainerEl = document.createElement("div")
    const messageEl = document.createElement("p")
    const closeIconEl = crossIcon(styles.cross)
    const infoIconEl = infoIcon(styles.infoIcon)

    messageEl.textContent = `Info message: ${message}`

    alertContainerEl.classList.add(styles["container"])
    messageEl.classList.add(styles["message"])

    closeIconEl.addEventListener("click", clickHandler)

    alertContainerEl.append(infoIconEl)
    alertContainerEl.append(messageEl)
    alertContainerEl.append(closeIconEl)

    document.body.append(alertContainerEl)

    function clickHandler() {
        alertContainerEl.classList.remove(styles["appended"])

        setTimeout(() => {
            alertContainerEl.remove()
        }, CLOSING_ANIMATION_DELAY)
    }

    requestAnimationFrame(() => {
        alertContainerEl.classList.add(styles["appended"])
    })

    setTimeout(() => {
        alertContainerEl.classList.remove(styles["appended"])
    }, AUTO_DISAPPEARING_DELAY)

    setTimeout(() => {
        alertContainerEl.remove()
    }, DISAPPEARING_DELAY)
}
