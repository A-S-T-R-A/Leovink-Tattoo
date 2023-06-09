import { Input } from "../../ui/Input/Input"
import { CtaButton } from "../CtaButton/CtaButton"
import { useState } from "preact/hooks"
import { Typography } from "../../ui/Typography/Typography"
import styles from "./Form.module.scss"
import { classNames } from "../../lib/classNames/classNames"

export function Form({ isVertical }: { isVertical?: boolean }) {
    const [formData, setFormData] = useState({ name: "", phone: "" })

    return (
        <form
            id="formSection"
            className={classNames(styles.form, { [styles.vertical]: isVertical })}
        >
            <Typography className={styles.title}>Book an appointment</Typography>
            <div className={styles.formContent}>
                <Input
                    /* placeholder="Your name" */
                    className={styles.input}
                    value={formData.name}
                    onChange={name => setFormData(prev => ({ ...prev, name }))}
                />
                <Input
                    /*    placeholder="Your phone" */
                    className={styles.input}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                />
                <CtaButton />
            </div>
        </form>
    )
}
