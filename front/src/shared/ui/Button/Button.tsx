import type { ComponentChildren } from "preact"
import type { HTMLAttributes } from "preact/compat"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Button.module.scss"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string
    children: ComponentChildren
}

export function Button(props: ButtonProps) {
    const { children, className, ...otherProps } = props

    return (
        <button className={classNames(styles.btn, {}, [className])} {...otherProps}>
            {children}
        </button>
    )
}
