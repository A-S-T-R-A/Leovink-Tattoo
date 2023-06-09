//import { ReactNode } from "react"
import { Typography, TypographyColor } from "../Typography/Typography"
import { ArrowLeftIcon } from "../Icons"
import styles from "./PageWrapper.module.scss"
import { AppLink } from "../AppLink/AppLink"

export default function PageWrapper({ children, title }: { children: any; title: string }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography color={TypographyColor.COLOR_DARKGRAY} className={styles.title}>
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
