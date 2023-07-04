import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Footer.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import type { FooterType } from "shared/const/firebaseVariables"
import type { ComponentChildren } from "preact"

export function Footer({ data, children }: { data: FooterType; children: ComponentChildren }) {
    const { location, contacts, footerList } = data
    return (
        <footer className={styles.container}>
            <div className={styles.logoContainer}>{children}</div>
            <div className={styles.locationContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[0]}
                </Typography>
                <a
                    href="https://yandex.ru/maps/org/leovink_tattoo_studio/184496310101/?utm_medium=mapframe&utm_source=maps"
                    className={styles.text}
                >
                    {location}
                </a>
            </div>
            <div className={styles.contactsContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[1]}
                </Typography>
                {contacts.map(item => (
                    <Typography className={styles.text} tag="p" size="m" color="lightgray">
                        {item}
                    </Typography>
                ))}
            </div>
            <div className={styles.followContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[2]}
                </Typography>
                <SocialIcons className={styles.socials} />
            </div>
        </footer>
    )
}
