import { Button } from "shared/ui/Button/Button"
import styles from "./CtaButton.module.scss"
import { ArrowDownIcon } from "shared/ui/Icons"

export function CtaButton() {
    return (
        <Button className={styles.btn}>
            Book an appointment
            <ArrowDownIcon className={styles.icon} />
        </Button>
    )
}
