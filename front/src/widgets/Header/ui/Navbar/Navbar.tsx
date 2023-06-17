import { NavigationList } from "../NavigationList/NavigationList"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Navbar.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import { Languages } from "../Languages/Languages"
import type { LanguageType } from "shared/types/types"
import type { NavlistType } from "shared/const/firebaseVariables"

export function Navbar({
    className,
    language,
    defaultLanguage,
    data,
}: {
    className?: string
    language: LanguageType
    defaultLanguage: LanguageType
    data: NavlistType
}) {
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <NavigationList className={styles.navList} data={data} />
            <SocialIcons className={styles.socialIcons} />
            <Languages
                className={styles.languages}
                defaultLanguage={defaultLanguage}
                language={language}
            />
        </div>
    )
}
