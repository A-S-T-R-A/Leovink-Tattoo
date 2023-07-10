import { NavigationList } from "../NavigationList/NavigationList"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Navbar.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import { Languages } from "../Languages/Languages"
import type { LanguageType } from "shared/types/types"
import type { ISocialMedia } from "shared/types/IGlobalData"

export function Navbar({
    className,
    language,
    defaultLanguage,
    data,
    socialsData,
}: {
    className?: string
    language: LanguageType
    defaultLanguage: LanguageType
    data: { [key: number]: { link: string; text: string } }
    socialsData: ISocialMedia[]
}) {
    return (
        <nav className={classNames(styles.container, {}, [className])}>
            <NavigationList className={styles.navList} data={data} />
            <SocialIcons className={styles.socialIcons} data={socialsData} />
            <Languages
                className={styles.languages}
                defaultLanguage={defaultLanguage}
                language={language}
            />
        </nav>
    )
}
