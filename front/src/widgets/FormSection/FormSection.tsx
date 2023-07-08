import { Section } from "shared/ui/Section/Section"
import { Form } from "shared/components/Form/Form"
import styles from "./FormSection.module.scss"
import type { IFormData } from "shared/types/IGlobalData"

export function FormSection({
    data,
    title,
    button,
}: {
    data: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
    }
    title: string
    button: string
}) {
    return (
        <Section wrapperClassName={styles.wrapper}>
            <Form className={styles.form} data={data} title={title} cta={button} />
        </Section>
    )
}
