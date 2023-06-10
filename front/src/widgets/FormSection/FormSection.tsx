import { Section } from "shared/ui/Section/Section"
import { Form } from "shared/components/Form/Form"
import styles from "./FormSection.module.scss"

export function FormSection() {
    return (
        <Section wrapperClassName={styles.wrapper}>
            <Form className={styles.form} />
        </Section>
    )
}
