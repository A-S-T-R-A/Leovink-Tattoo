import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import { Section } from "shared/ui/Section/Section"
import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import styles from "./Faq.module.scss"
import type { IFaqData } from "shared/const/firebaseVariables"

export function Faq({ data }: { data: IFaqData[] }) {
    return (
        <Section title="FAQ">
            <FaqBlock data={data.filter(item => item.title === "index")[0]} isWithoutTitle />
            <ShowMoreLink to="/faq" text="Show more" className={styles.link} />
        </Section>
    )
}
