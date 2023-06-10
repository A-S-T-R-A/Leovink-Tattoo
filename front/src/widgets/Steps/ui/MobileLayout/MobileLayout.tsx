import { Children } from "preact/compat"
import { LineIcon } from "shared/ui/Icons"
import styles from "./MobileLayout.module.scss"
import { BigLine } from "shared/ui/Icons"
import type { ComponentChildren } from "preact"
import { classNames } from "shared/lib/classNames/classNames"

export function MobileLayout({
    children,
    className,
}: {
    className?: string
    children: ComponentChildren
}) {
    const array = Children.toArray(children)

    return (
        <div className={classNames(styles.container, {}, [className])}>
            <div className={styles.firstStep}>
                {array[0]} <BigLine className={styles.leftLine} />
            </div>
            <div className={styles.secondStep}>
                {array[1]} <BigLine className={styles.rightLine} />
            </div>
            <div className={styles.thirdStep}>
                {array[2]} <BigLine className={styles.leftLine} />
            </div>
            <div className={styles.fourthStep}>
                {array[3]} <BigLine className={styles.rightLine} />
            </div>

            <div className={styles.fifthStep}>
                {array[4]} <BigLine className={styles.leftLine} />
            </div>
            <div className={styles.sixthStep}>{array[5]}</div>
        </div>
    )
}
