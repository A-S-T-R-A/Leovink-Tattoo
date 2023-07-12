import type { ComponentChildren } from "preact"
import { Typography } from "shared/ui/Typography/Typography"
import { ArrowLeftIcon } from "shared/ui/Icons"
import styles from "./PageWrapper.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"

export function PageWrapper({
    children,
    title,
    main,
}: {
    children: ComponentChildren
    title: string
    main: string
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography tag="h1" size="xxxxl" color="darkgray" className={styles.title}>
                    {title}
                </Typography>
                <AppLink className={styles.back} to="/">
                    <ArrowLeftIcon /> {main}
                </AppLink>
            </div>

            <main className={styles.content}>{children}</main>
        </div>
    )
}
