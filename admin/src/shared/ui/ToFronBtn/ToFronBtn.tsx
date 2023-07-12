import { classNames } from "shared/lib/classNames/classNames"
import { Confirm } from "../CustomNotifications"
import styles from "./ToFrontBtn.module.scss"

export function ToFronBtn({ className }: { className?: string }) {
    async function clickHandler() {
        const isConfirmed = await Confirm("You will be redirected to leovink-tattoo.com")
        if (isConfirmed) window.open("https://leovink-tattoo.com/", "_blank")
        return null
    }

    return (
        <button onClick={clickHandler} className={classNames(styles.btn, {}, [className])}>
            Leovink Tattoo Website
        </button>
    )
}
