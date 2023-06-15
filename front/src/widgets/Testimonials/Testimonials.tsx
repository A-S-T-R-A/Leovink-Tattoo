import { Section } from "shared/ui/Section/Section"
import styles from "./Testimonials.module.scss"
import { Testimonial } from "shared/components/Testimonial/Testimonial"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import type { ITestimonialsData } from "shared/const/firebaseVariables"

export function Testimonials({ data }: { data: ITestimonialsData[] }) {
    return (
        <Section title="Testimonials">
            {data.map((item, index, array) => (
                <Testimonial
                    data={item}
                    /* isReversed */ isWithBorder={index !== array.length - 1}
                />
            ))}
            <ShowMoreLink to="/testimonials" text="Show More" className={styles.showMore} />
        </Section>
    )
}
