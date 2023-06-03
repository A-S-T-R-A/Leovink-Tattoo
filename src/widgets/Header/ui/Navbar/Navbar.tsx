import { NavigationList } from "../NavigationList/NavigationList"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Navbar.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"

export function Navbar({ className }: { className?: string }) {
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <NavigationList className={styles.navList} />
            <SocialIcons />
        </div>
    )
}
