import { Section } from "shared/ui/Section/Section"
import { Form } from "shared/components/Form/Form"
import styles from "./FormSection.module.scss"

export function FormSection({
    data,
    title,
    button,
}: {
    data: { name: string; phone: string }
    title: string
    button: string
}) {
    return (
        <Section wrapperClassName={styles.wrapper}>
            <Form className={styles.form} placeholdersData={data} title={title} cta={button} />
        </Section>
    )
}
