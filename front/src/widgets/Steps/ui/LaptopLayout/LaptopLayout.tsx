import { Children } from "preact/compat"
import { BigLine } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./LaptopLayout.module.scss"

export function LaptopLayout({ children, className }: { className?: string; children: any }) {
    const array = Children.toArray(children)
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <div className={styles.firstStep}>
                {array[0]} <BigLine className={styles.firstLine} />
            </div>
            <div className={styles.secondStep}>
                {array[1]} <BigLine className={styles.secondLine} />
            </div>
            <div className={styles.thirdStep}>
                {array[2]} <BigLine className={styles.thirdLine} />
            </div>
            <div className={styles.fourthStep}>
                {array[3]} <BigLine className={styles.fourthLine} />
            </div>
            <div className={styles.fifthStep}>
                {array[4]} <BigLine className={styles.fifthLine} />
            </div>
            <div className={styles.sixthStep}>{array[5]} </div>
        </div>
    )
}
