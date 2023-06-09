import { NavigationList } from "../NavigationList/NavigationList"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Navbar.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import { Language } from "../Language/Language"

export function Navbar({ className }: { className?: string }) {
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <NavigationList className={styles.navList} />
            <SocialIcons className={styles.socialIcons} />
            <Language />
        </div>
    )
}
