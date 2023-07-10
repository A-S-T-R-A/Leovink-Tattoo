import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import { Section } from "shared/ui/Section/Section"
import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import styles from "./Faq.module.scss"
import type { IFaqData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"

export function Faq({
    data,
    title,
    button,
    language,
    defaultLanguage,
}: {
    data: IFaqData[] | null
    title: string
    button: string
    language: LanguageType
    defaultLanguage: LanguageType
}) {
    const link = language === defaultLanguage ? "/faq" : `/${language}/faq`
    if (!data) return null
    return (
        <Section title={title}>
            <FaqBlock data={data.filter(item => item.title === "index")[0]} isWithoutTitle />
            <ShowMoreLink to={link} text={button} className={styles.link} />
        </Section>
    )
}
