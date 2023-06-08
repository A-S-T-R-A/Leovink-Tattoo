//import { ButtonHTMLAttributes, ReactNode } from "react"
import { classNames } from "../../lib/classNames/classNames"
import styles from "./Button.module.scss"

interface ButtonProps {
    className?: string
    children: any
}

export function Button(props: ButtonProps) {
    const { children, className, ...otherProps } = props

    return (
        <button className={classNames(styles.btn, {}, [className])} {...otherProps}>
            {children}
        </button>
    )
}
