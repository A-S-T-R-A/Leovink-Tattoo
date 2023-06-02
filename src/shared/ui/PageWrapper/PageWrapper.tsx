import { ReactNode } from "react"
import { Typography, TypographyColor, TypographySize } from "../Typography/Typography"
import { ArrowLeftIcon } from "../Icons"
import { useNavigate } from "react-router-dom"
import styles from "./PageWrapper.module.scss"

export function PageWrapper({ children, title }: { children: ReactNode; title: string }) {
    const navigate = useNavigate()

    function clickHandler() {
        navigate("/")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography
                    size={TypographySize.H1}
                    color={TypographyColor.COLOR_GRAY}
                    className={styles.title}
                >
                    {title}
                </Typography>
                <Typography size={TypographySize.H4} className={styles.back} onClick={clickHandler}>
                    <ArrowLeftIcon /> BACK
                </Typography>
            </div>

            <div className={styles.content}>{children}</div>
        </div>
    )
}
