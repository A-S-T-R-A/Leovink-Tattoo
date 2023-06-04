import { Section } from "shared/ui/Section/Section"
import styles from "./Testimonials.module.scss"
import { Testimonial } from "shared/components/Testimonial/Testimonial"

export function Testimonials() {
    const data = [1, 2, 3]

    return (
        <Section title="Testimonials">
            {data.map((item, index, array) => (
                <Testimonial key={index} isReversed isWithBorder={index !== array.length - 1} />
            ))}
        </Section>
    )
}
