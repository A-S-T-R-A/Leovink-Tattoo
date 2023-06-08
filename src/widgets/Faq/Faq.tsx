import { ShowMoreLink } from "../../shared/components/ShowMoreLink/ShowMoreLink"
import { Section } from "../../shared/ui/Section/Section"
import { faqData } from "../../shared/const/faqData"
import { FaqBlock } from "../../shared/components/FaqBlock/FaqBlock"
import styles from "./Faq.module.scss"

export function Faq() {
    const data = faqData[0]

    return (
        <Section title="FAQ">
            <FaqBlock data={data} isWithoutTitle />
            <ShowMoreLink to="/faq" text="Show more" className={styles.link} />
        </Section>
    )
}
