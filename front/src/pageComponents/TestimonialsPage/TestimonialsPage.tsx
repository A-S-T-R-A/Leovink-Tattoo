import { Testimonial } from "shared/components/Testimonial/Testimonial"
import type { ITestimonialsData } from "shared/const/firebaseVariables"

export function TestimonialPage({ data, cta }: { data: ITestimonialsData[] | null; cta: string }) {
    if (!data) return null
    return (
        <>
            {data.map((item, index, array) => (
                <Testimonial
                    key={index}
                    isReversed
                    isWithBorder={index !== array.length - 1}
                    data={item}
                    cta={cta}
                />
            ))}
        </>
    )
}
