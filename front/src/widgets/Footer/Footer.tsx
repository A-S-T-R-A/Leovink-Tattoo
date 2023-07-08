import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Footer.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"
import type { ComponentChildren } from "preact"
import { reformatAndSortObjectValuesToArray } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"
import type { IAddressData, ISocialMedia } from "shared/types/IGlobalData"

export function Footer({
    data,
    children,
    language,
    addressData,
    socialsData,
}: {
    data: {
        [key: number]: string
    }
    children: ComponentChildren
    language: LanguageType
    addressData: IAddressData
    socialsData: ISocialMedia[]
}) {
    const footerList = reformatAndSortObjectValuesToArray(data)
    const { location, mail, phone } = addressData
    return (
        <footer className={styles.container}>
            <div className={styles.logoContainer}>{children}</div>
            <div className={styles.locationContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[0]}
                </Typography>
                <a
                    href="https://yandex.ru/maps/org/leovink_tattoo_studio/184496310101/?utm_medium=mapframe&utm_source=maps"
                    className={styles.text}
                >
                    {location[language]}
                </a>
            </div>
            <div className={styles.contactsContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[1]}
                </Typography>
                {[...phone, ...mail].map(item => (
                    <Typography className={styles.text} tag="p" size="m" color="lightgray">
                        {item}
                    </Typography>
                ))}
            </div>
            <div className={styles.followContainer}>
                <Typography className={styles.header} tag="h3" size="xxl">
                    {footerList[2]}
                </Typography>
                <SocialIcons className={styles.socials} data={socialsData} />
            </div>
        </footer>
    )
}
