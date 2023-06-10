import type { ComponentChildren } from "preact"
import { classNames } from "shared/lib/classNames/classNames"
import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Section.module.scss"

interface ISectionProps {
    children: ComponentChildren
    wrapperClassName?: string
    containerClassName?: string
    title?: string
}

export function Section(props: ISectionProps) {
    const { children, wrapperClassName, containerClassName, title } = props

    return (
        <section className={classNames(styles.wrapper, {}, [wrapperClassName])}>
            <div className={classNames(styles.container, {}, [containerClassName])}>
                {!!title && (
                    <Typography className={styles.title} variant="h1">
                        {title}
                    </Typography>
                )}
                {children}
            </div>
        </section>
    )
}
