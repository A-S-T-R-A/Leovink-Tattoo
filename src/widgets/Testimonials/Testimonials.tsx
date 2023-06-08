import { Section } from "../../shared/ui/Section/Section"
import styles from "./Testimonials.module.scss"
import { Testimonial } from "../../shared/components/Testimonial/Testimonial"
import { ShowMoreLink } from "../../shared/components/ShowMoreLink/ShowMoreLink"

export function Testimonials() {
    const data = [1, 2, 3]

    return (
        <Section title="Testimonials">
            {data.map((item, index, array) => (
                <Testimonial key={index} isReversed isWithBorder={index !== array.length - 1} />
            ))}
            <ShowMoreLink to="/testimonials" text="Show More" className={styles.showMore} />
        </Section>
    )
}
