import { classNames } from "../../lib/classNames/classNames"
import { Typography, TypographySize } from "../Typography/Typography"
import styles from "./Section.module.scss"

interface ISectionProps {
    children: any
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
                    <Typography className={styles.title} size={TypographySize.H1}>
                        {title}
                    </Typography>
                )}
                {children}
            </div>
        </section>
    )
}
