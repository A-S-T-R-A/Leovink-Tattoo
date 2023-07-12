import { Children } from "preact/compat"
import { LineIcon } from "shared/ui/Icons"
import styles from "./DesktopLayout.module.scss"
import { BigLine } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

export function DesktopLayout({ children, className }: { className?: string; children: any }) {
    const array = Children.toArray(children)

    return (
        <div className={classNames(styles.container, {}, [className])}>
            <div className={styles.firstStep}>
                {array[0]} <BigLine className={styles.firstLine} />
            </div>
            <div className={styles.secondStep}>
                {array[1]} <BigLine className={styles.secondLine} />
            </div>
            <div className={styles.thirdStep}>{array[2]}</div>
            <div className={styles.bigLine}>
                <BigLine className={styles.bigLineIcon} />
            </div>
            <div className={styles.sixthStep}>
                {array[5]} <BigLine className={styles.sixthLine} />
            </div>
            <div className={styles.fifthStep}>
                {array[4]} <BigLine className={styles.fifthLine} />
            </div>
            <div className={styles.fourthStep}>{array[3]}</div>
        </div>
    )
}
