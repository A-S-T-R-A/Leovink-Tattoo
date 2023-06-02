import { Section } from "shared/ui/Section/Section"
import { Typography, TypographyColor } from "shared/ui/Typography/Typography"

export function HomePage() {
    return (
        <Section title="Hello">
            <Typography color={TypographyColor.COLOR_ACCENT}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque fugiat ipsum,
                impedit officia, ipsam, ipsa maiores iste placeat quisquam cumque rem! Excepturi
                nobis, quas nulla aperiam id distinctio perspiciatis saepe?
            </Typography>
        </Section>
    )
}
