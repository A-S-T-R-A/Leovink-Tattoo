import { Section } from "shared/ui/Section/Section"
import styles from "./Testimonials.module.scss"
import { Testimonial } from "shared/components/Testimonial/Testimonial"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import type { ITestimonialsData } from "shared/const/firebaseVariables"

export function Testimonials({
    data,
    title,
    showMore,
    cta,
}: {
    data: ITestimonialsData[]
    title: string
    showMore: string
    cta: string
}) {
    return (
        <Section title={title}>
            {data.map((item, index, array) => (
                <Testimonial data={item} cta={cta} isWithBorder={index !== array.length - 1} />
            ))}
            <ShowMoreLink to="/testimonials" text={showMore} className={styles.showMore} />
        </Section>
    )
}
