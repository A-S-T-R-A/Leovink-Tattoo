import { Section } from "shared/ui/Section/Section"
import styles from "./Testimonials.module.scss"
import { Testimonial } from "shared/components/Testimonial/Testimonial"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import type { ITestimonialsData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"

export function Testimonials({
    data,
    title,
    showMore,
    cta,
    language,
    defaultLanguage,
}: {
    data: ITestimonialsData[]
    title: string
    showMore: string
    cta: string
    language: LanguageType
    defaultLanguage: LanguageType
}) {
    const link = language === defaultLanguage ? "/testimonials" : `/${language}/testimonials`
    return (
        <Section title={title}>
            {data.map((item, index, array) => (
                <Testimonial data={item} cta={cta} isWithBorder={index !== array.length - 1} />
            ))}
            <ShowMoreLink to={link} text={showMore} className={styles.showMore} />
        </Section>
    )
}
