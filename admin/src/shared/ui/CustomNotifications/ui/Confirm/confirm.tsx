import { TRANSITION_TIME } from "../../const/const"
import { crossIcon } from "../../svg/crossIcon"
import { questionIcon } from "../../svg/questionIcon"
import styles from "./confirm.module.scss"

export function Confirm(message: string): Promise<boolean> {
    const wrapperEl = document.createElement("div")
    const containerEl = document.createElement("div")
    const buttonContainerEl = document.createElement("div")
    const messageEl = document.createElement("p")
    const strongTextEl = document.createElement("strong")
    const confirmBtnEl = document.createElement("button")
    confirmBtnEl.textContent = "Confirm"
    const refuseBtnEl = document.createElement("button")
    refuseBtnEl.textContent = "Refuse"

    const closeIconEl = crossIcon(styles.cross)
    const iconEl = questionIcon(styles.icon)

    strongTextEl.textContent = "Please confirm your action:"
    messageEl.textContent = message

    wrapperEl.classList.add(styles.wrapper)
    containerEl.classList.add(styles.container)
    buttonContainerEl.classList.add(styles.btnContainer)
    messageEl.classList.add(styles.message)

    containerEl.style.transition = `all ${TRANSITION_TIME}ms ease-in`

    buttonContainerEl.append(confirmBtnEl)
    buttonContainerEl.append(refuseBtnEl)
    containerEl.append(iconEl)
    containerEl.append(strongTextEl)
    containerEl.append(messageEl)
    containerEl.append(closeIconEl)
    containerEl.append(buttonContainerEl)
    wrapperEl.append(containerEl)

    document.body.append(wrapperEl)

    function cleanup(timeout = 0) {
        setTimeout(() => {
            containerEl.classList.remove(styles.appended)
        }, timeout)

        setTimeout(() => {
            wrapperEl.remove()
        }, timeout + TRANSITION_TIME)
    }

    requestAnimationFrame(() => {
        containerEl.classList.add(styles.appended)
    })

    return new Promise((res, rej) => {
        confirmBtnEl.onclick = () => {
            cleanup()
            res(true)
        }
        refuseBtnEl.onclick = () => {
            cleanup()
            res(false)
        }
        closeIconEl.onclick = () => {
            cleanup()
            res(false)
        }
    })
}
