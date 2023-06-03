import { ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Section.module.scss"

interface ISectionProps {
    children: ReactNode
    wrapperClassName?: string
    containerClassName?: string
    title?: string
}

export function Section(props: ISectionProps) {
    const { children, wrapperClassName, containerClassName, title } = props

    return (
        <section className={classNames(styles.wrapper, {}, [wrapperClassName])}>
            <div className={classNames(styles.container, {}, [containerClassName])}>
                {!!title && <h1 className={styles.title}>{title}</h1>}
                {children}
            </div>
        </section>
    )
}
