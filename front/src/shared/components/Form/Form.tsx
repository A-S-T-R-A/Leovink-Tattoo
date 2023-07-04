import { Input } from "shared/ui/Input/Input"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { useState } from "preact/hooks"
import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Form.module.scss"
import { classNames } from "shared/lib/classNames/classNames"

export function Form({
    isVertical,
    className,
    placeholdersData,
    title,
    cta,
}: {
    className?: string
    isVertical?: boolean
    placeholdersData: { name: string; phone: string }
    title: string
    cta: string
}) {
    const [formData, setFormData] = useState({ name: "", phone: "" })

    return (
        <form
            id="formSection"
            className={classNames(styles.form, { [styles.vertical]: isVertical }, [className])}
        >
            <Typography tag="h2" size="xxl" className={styles.title}>
                {title}
            </Typography>
            <div className={styles.formContent}>
                <Input
                    placeholder={placeholdersData.name}
                    className={styles.input}
                    value={formData.name}
                    onChange={name => setFormData(prev => ({ ...prev, name }))}
                />
                <Input
                    placeholder={placeholdersData.phone}
                    className={styles.input}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                />
                <CtaButton className={styles.btn} text={cta} />
            </div>
        </form>
    )
}
