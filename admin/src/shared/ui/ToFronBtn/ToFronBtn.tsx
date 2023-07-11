import { classNames } from "shared/lib/classNames/classNames"
import { Confirm } from "../CustomNotifications"
import styles from "./ToFrontBtn.module.scss"

export function ToFronBtn({ className }: { className?: string }) {
    async function clickHandler() {
        const isConfirmed = await Confirm("You will open main website")
        if (isConfirmed) window.open("http://localhost:3000", "_blank")
        return null
    }

    return (
        <button onClick={clickHandler} className={classNames(styles.btn, {}, [className])}>
            Leovink Tattoo Website
        </button>
    )
}
