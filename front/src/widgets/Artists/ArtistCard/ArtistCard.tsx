import { Typography } from "shared/ui/Typography/Typography"
import styles from "./ArtistCard.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { ArrowDownIcon } from "shared/ui/Icons"
import type { IArtistsData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"

export function ArtistCard({
    data,
    button,
    language,
    defaultLanguage,
}: {
    data: IArtistsData
    button: string
    language: LanguageType
    defaultLanguage: LanguageType
}) {
    const { img, name, description, specialization, slug } = data

    function getLocalizedLink(slug: string) {
        const path = "/" + slug
        if (language === defaultLanguage) return path
        return "/" + language + path
    }

    return (
        <div className={styles.container}>
            <img src={img} alt="" className={styles.img} />
            <Typography tag="h3" size="xxl" className={styles.name}>
                {name}
            </Typography>
            <Typography tag="p" size="m" color="lightgray" className={styles.specialization}>
                {specialization}
            </Typography>
            <Typography tag="p" size="m" color="lightgray" className={styles.description}>
                {description}
            </Typography>
            <AppLink to={getLocalizedLink(slug)} className={styles.view}>
                {button} <ArrowDownIcon />
            </AppLink>
        </div>
    )
}
