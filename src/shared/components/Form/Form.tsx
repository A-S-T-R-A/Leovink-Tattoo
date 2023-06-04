import { Input } from "shared/ui/Input/Input"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { useState } from "react"
import { Typography, TypographySize } from "shared/ui/Typography/Typography"
import styles from "./Form.module.scss"

export function Form() {
    const [formData, setFormData] = useState({ name: "", phone: "" })

    return (
        <form className={styles.form}>
            <Typography className={styles.title} size={TypographySize.H1}>
                Book an appointment
            </Typography>
            <div className={styles.formContent}>
                <Input
                    placeholder="Your name"
                    className={styles.input}
                    value={formData.name}
                    onChange={name => setFormData(prev => ({ ...prev, name }))}
                />
                <Input
                    placeholder="Your phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                />
                <CtaButton />
            </div>
        </form>
    )
}
