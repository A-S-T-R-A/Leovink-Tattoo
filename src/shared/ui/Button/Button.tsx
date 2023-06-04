import { ButtonHTMLAttributes, ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Button.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: ReactNode
}

export function Button(props: ButtonProps) {
    const { children, className, ...otherProps } = props

    return (
        <button className={classNames(styles.btn, {}, [className])} {...otherProps}>
            {children}
        </button>
    )
}
