import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Footer.module.scss"
import logo from "shared/assets/images/logo.png"
import { SocialIcons } from "shared/components/SocialIcons"

export function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.location}>
                <Typography className={styles.header}>location</Typography>
                <Typography className={styles.text}>Strada Ismail 40/2, Chișinău</Typography>
            </div>
            <div className={styles.contacts}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    contacts
                </Typography>

                <Typography className={styles.text}>069 222 222</Typography>
                <Typography className={styles.text}>069 222 222</Typography>
                <Typography className={styles.text}>email@gg.ss</Typography>
            </div>
            <div className={styles.follow}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    follow
                </Typography>
                <SocialIcons className={styles.socials} />
            </div>
        </footer>
    )
}
