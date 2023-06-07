import { Testimonial } from "shared/components/Testimonial/Testimonial"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Section } from "shared/ui/Section/Section"
import { FormSection } from "widgets/FormSection/FormSection"

export function TestimonialsPage() {
    const data = [1, 2, 3, 4, 5]

    return (
        <PageWrapper title="Testimonials">
            <Section>
                {data.map((item, index, array) => (
                    <Testimonial key={index} isReversed isWithBorder={index !== array.length - 1} />
                ))}
            </Section>
            <FormSection />
        </PageWrapper>
    )
}
