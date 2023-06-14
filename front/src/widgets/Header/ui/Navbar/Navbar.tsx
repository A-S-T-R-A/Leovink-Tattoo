import { NavigationList } from "../NavigationList/NavigationList"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Navbar.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import { Languages } from "../Languages/Languages"
import type { LanguageType } from "../../types/type"

export function Navbar({ className, language }: { className?: string; language: LanguageType }) {
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <NavigationList className={styles.navList} />
            <SocialIcons className={styles.socialIcons} />
            <Languages className={styles.languages} language={language} />
        </div>
    )
}
