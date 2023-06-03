import { Section } from "shared/ui/Section/Section"
import { MasonryGrid } from "shared/ui/MasonryGrid/MasonryGrid"
import { data } from "shared/const/data"

export function Portfolio() {
    return (
        <Section title="Portfolio">
            <MasonryGrid data={data} />
        </Section>
    )
}
