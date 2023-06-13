import { Mods, classNames } from "shared/lib/classNames/classNames"
import styles from "./Typography.module.scss"
import type { ComponentChildren } from "preact"
import type { HTMLAttributes } from "preact/compat"

interface TypographyProps {
    className?: string
    children: ComponentChildren
    isBold?: boolean
    variant?: "h1" | "h2" | "h3" | "h4" | "h5"
    component?: "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl" | "xxxxl"
}

export function Typography(props: TypographyProps) {
    const { variant = "h4", component = "m", children, className, isBold } = props

    const mods: Mods = {
        [styles.xs]: "xs" === component,
        [styles.s]: "s" === component,
        [styles.m]: "m" === component,
        [styles.l]: "l" === component,
        [styles.xl]: "xl" === component,
        [styles.xxl]: "xxl" === component,
        [styles.xxxl]: "xxxl" === component,
        [styles.xxxxl]: "xxxxl" === component,
        [styles.bold]: isBold,
    }

    let Typography

    switch (true) {
        case "h1" === variant:
            Typography = (
                <h1 className={classNames(styles.typography, mods, [className])}>{children}</h1>
            )
            break
        case "h2" === variant:
            Typography = (
                <h2 className={classNames(styles.typography, mods, [className])}>{children}</h2>
            )
            break
        case "h3" === variant:
            Typography = (
                <h3 className={classNames(styles.typography, mods, [className])}>{children}</h3>
            )
            break
        case "h4" === variant:
            Typography = (
                <h4 className={classNames(styles.typography, mods, [className])}>{children}</h4>
            )
            break
        case "h5" === variant:
            Typography = (
                <h5 className={classNames(styles.typography, mods, [className])}>{children}</h5>
            )
            break
        default:
            Typography = (
                <p className={classNames(styles.typography, mods, [className])}>{children}</p>
            )
            break
    }

    return Typography
}
