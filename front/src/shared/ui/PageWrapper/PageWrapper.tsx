import type { ComponentChildren } from "preact"
import { Typography } from "shared/ui/Typography/Typography"
import { ArrowLeftIcon } from "shared/ui/Icons"
import styles from "./PageWrapper.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"

export function PageWrapper({ children, title }: { children: ComponentChildren; title: string }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography variant="h1" component="xxxxl" className={styles.title}>
                    {title}
                </Typography>
                <AppLink className={styles.back} to="/">
                    <ArrowLeftIcon /> BACK
                </AppLink>
            </div>

            <div className={styles.content}>{children}</div>
        </div>
    )
}