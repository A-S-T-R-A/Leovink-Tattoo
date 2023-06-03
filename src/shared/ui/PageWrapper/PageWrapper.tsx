import { ReactNode } from "react"
import { Typography, TypographyColor, TypographySize } from "../Typography/Typography"
import { ArrowLeftIcon } from "../Icons"
import styles from "./PageWrapper.module.scss"
import { AppLink } from "../AppLink/AppLink"

export function PageWrapper({ children, title }: { children: ReactNode; title: string }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography
                    size={TypographySize.H1}
                    color={TypographyColor.COLOR_DARKGRAY}
                    className={styles.title}
                >
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
