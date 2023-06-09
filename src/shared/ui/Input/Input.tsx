import { classNames } from "shared/lib/classNames/classNames"
import type { ChangeEvent, HTMLAttributes } from "preact/compat"
import styles from "./Input.module.scss"

type HtmlInputProps = Omit<HTMLAttributes<HTMLInputElement>, "value" | "onChange">

export enum InputType {
    TEXT = "text",
    NUMBER = "number",
}

export interface InputProps extends HtmlInputProps {
    type?: InputType
    label?: string
    isRequired?: boolean
    className?: string
    error?: string
    value: string | number
    id?: string
    onChange: (value: string) => void
}

export function Input(props: InputProps) {
    const {
        type = InputType.TEXT,
        label,
        isRequired = false,
        className,
        error,
        value,
        id,
        onChange,
        ...otherProps
    } = props

    const containerClassName = classNames(styles.container, { [styles.incorrect]: error }, [
        className,
    ])

    function changeHandler(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        onChange?.(target.value)
    }

    return (
        <div className={containerClassName} data-testid="InputContainer">
            {!!label && (
                <label htmlFor={id} className={styles.label} data-testid="InputLabel">
                    {label}
                    {isRequired && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                id={id}
                onChange={changeHandler}
                value={value}
                type={type}
                className={styles.input}
                {...otherProps}
                data-testid="Input"
            />
            {!!error && <p className={styles.error}>{error}</p>}
        </div>
    )
}
