import { useState, InputHTMLAttributes, useMemo, ChangeEvent } from "react"

import styles from "./Dropdown.module.scss"
import { ChevronDownIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

type HTMLDropdownProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

export interface IDropdownOption {
    value: string
    label: string
}

export interface DropdownProps extends HTMLDropdownProps {
    label?: string
    className?: string
    error?: string
    value?: string
    id?: string
    firstOptionText?: string
    onChange?: (value: string) => void
    options: IDropdownOption[]
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        error,
        value,
        id,
        onChange,
        options,
        firstOptionText = "Select an option",
        ...otherProps
    } = props
    const newOptions = useMemo(() => options.map((i, ind) => ({ ...i, id: ind })), [options])

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLSelectElement
        onChange?.(target.value)
    }

    return (
        <div className={classNames(styles.container, {}, [className])}>
            <select
                data-testid="dropdown-label"
                className={styles.select}
                value={value}
                onChange={handleChange}
            >
                <option data-testid="dropdown-option-base" value="">
                    {firstOptionText}
                </option>
                {newOptions.map(option => (
                    <option
                        data-testid={`dropdown-option ${option.id}`}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
