import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import { Section } from "shared/ui/Section/Section"
import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import styles from "./Faq.module.scss"
import type { IFaqData } from "shared/const/firebaseVariables"

export function Faq({ data, title, button }: { data: IFaqData[]; title: string; button: string }) {
    return (
        <Section title={title}>
            <FaqBlock data={data.filter(item => item.title === "index")[0]} isWithoutTitle />
            <ShowMoreLink to="/faq" text={button} className={styles.link} />
        </Section>
    )
}
