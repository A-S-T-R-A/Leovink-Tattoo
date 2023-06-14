import { Testimonial } from "shared/components/Testimonial/Testimonial"

export function TestimonialPage() {
    const data = [1, 2, 3, 4, 5]

    return (
        <>
            {data.map((item, index, array) => (
                <Testimonial key={index} isReversed isWithBorder={index !== array.length - 1} />
            ))}
        </>
    )
}
