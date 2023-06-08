import { Button } from "../../ui/Button/Button"
import styles from "./CtaButton.module.scss"
import { ArrowDownIcon } from "../../ui/Icons"
import { classNames } from "../../lib/classNames/classNames"

export function CtaButton({ className }: { className?: string }) {
    function scrollToTarget() {
        const targetElement = document.getElementById("formSection")
        if (targetElement) {
            const offset = targetElement.offsetTop - 80
            window.scrollTo({
                top: offset,
                behavior: "smooth",
            })
        }
    }

    return (
        <Button className={classNames(styles.btn, {}, [className])}>
            Book an appointment
            <ArrowDownIcon className={styles.icon} />
        </Button>
    )
}
