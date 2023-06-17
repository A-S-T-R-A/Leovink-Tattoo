import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Footer.module.scss"
import logo from "shared/assets/images/logo.png"
import { SocialIcons } from "shared/components/SocialIcons"
import type { FooterType } from "shared/const/firebaseVariables"
import type { ComponentChildren } from "preact"

export function Footer({ data, children }: { data: FooterType; children: ComponentChildren }) {
    const { location, contacts, footerList } = data
    return (
        <footer className={styles.container}>
            <div className={styles.logoContainer}>{children}</div>
            <div className={styles.locationContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    {footerList[0]}
                </Typography>
                <Typography className={styles.text} variant="h5" component="m">
                    {location}
                </Typography>
            </div>
            <div className={styles.contactsContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    {footerList[1]}
                </Typography>
                {contacts.map(item => (
                    <Typography className={styles.text} variant="h5" component="m">
                        {item}
                    </Typography>
                ))}
            </div>
            <div className={styles.followContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    {footerList[2]}
                </Typography>
                <SocialIcons className={styles.socials} />
            </div>
        </footer>
    )
}
