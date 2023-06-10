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
            <div className={styles.locationContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    location
                </Typography>
                <Typography className={styles.text} variant="h5" component="m">
                    Strada Ismail 40/2, Chișinău
                </Typography>
            </div>
            <div className={styles.contactsContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    contacts
                </Typography>

                <Typography className={styles.text} variant="h5" component="m">
                    069 222 222
                </Typography>
                <Typography className={styles.text} variant="h5" component="m">
                    069 222 222
                </Typography>
                <Typography className={styles.text} variant="h5" component="m">
                    email@gg.ss
                </Typography>
            </div>
            <div className={styles.followContainer}>
                <Typography className={styles.header} variant="h3" component="xxl">
                    follow
                </Typography>
                <SocialIcons className={styles.socials} />
            </div>
        </footer>
    )
}
