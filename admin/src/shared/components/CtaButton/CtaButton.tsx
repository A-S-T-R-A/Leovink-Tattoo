import { Button } from "shared/ui/Button/Button"
import styles from "./CtaButton.module.scss"
import { ArrowDownIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

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
        <Button onClick={scrollToTarget} className={classNames(styles.btn, {}, [className])}>
            Book an appointment
            <ArrowDownIcon className={styles.icon} />
        </Button>
    )
}
