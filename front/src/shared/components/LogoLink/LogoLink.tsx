import type { LanguageType } from "shared/types/types"
import { logo } from "shared/assets/images"
import styles from "./LogoLink.module.scss"
import { Image } from "shared/ui/Image/Image"

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
            <Image
                src={logo}
                className={styles.logo}
                alt="Logo al salonului de tatuaje din Chișinău"
            />
        </a>
    )
}
