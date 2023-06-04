import { Children, ReactNode } from "react"
import { LineIcon } from "shared/ui/Icons"
import styles from "./DesktopLayout.module.scss"
import { BigLine } from "shared/ui/Icons"

export function DesktopLayout({ children }: { children: ReactNode }) {
    const array = Children.toArray(children)

    return (
        <div className={styles.container}>
            <div className={styles.firstStep}>
                {array[0]} <LineIcon className={styles.firstLine} />
            </div>
            <div className={styles.secondStep}>
                {array[1]} <LineIcon className={styles.secondLine} />
            </div>
            <div className={styles.thirdStep}>{array[2]}</div>
            <div className={styles.bigLine}>
                <BigLine className={styles.bigLineIcon} />
            </div>
            <div className={styles.sixthStep}>
                {array[5]} <LineIcon className={styles.sixthLine} />
            </div>
            <div className={styles.fifthStep}>
                {array[4]} <LineIcon className={styles.fifthLine} />
            </div>
            <div className={styles.fourthStep}>{array[3]}</div>
        </div>
    )
}
