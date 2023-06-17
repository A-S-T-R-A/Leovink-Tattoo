import type { LanguageType } from "shared/types/types"
import { logo } from "shared/assets/images"
import styles from "./LogoLink.module.scss"

export function LogoLink({
    language,
    defaultLanguage,
}: {
    defaultLanguage: LanguageType
    language: LanguageType
}) {
    function getLogoLink(language: LanguageType) {
        if (language === defaultLanguage) return "/"
        return "/" + language + "/"
    }
    
    return (
        <a href={getLogoLink(language)} className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="" />
        </a>
    )
}
