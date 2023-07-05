import { Mods, classNames } from "shared/lib/classNames/classNames"
import styles from "./Typography.module.scss"
import type { ComponentChildren } from "preact"

interface TypographyProps {
    className?: string
    children: ComponentChildren
    isBold?: boolean
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
    size?: "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl" | "xxxxl"
    color?: "base" | "darkgray" | "lightgray" | "accent" | "error"
    weight?: "four" | "five" | "six" | "seven"
}

export function Typography(props: TypographyProps) {
    const { color = "base", tag = "h4", size = "m", children, className, weight = "four" } = props

    const mods: Mods = {
        [styles.xs]: "xs" === size,
        [styles.s]: "s" === size,
        [styles.m]: "m" === size,
        [styles.l]: "l" === size,
        [styles.xl]: "xl" === size,
        [styles.xxl]: "xxl" === size,
        [styles.xxxl]: "xxxl" === size,
        [styles.xxxxl]: "xxxxl" === size,
        [styles.color_base]: "base" === color,
        [styles.color_darkgray]: "darkgray" === color,
        [styles.color_lightgray]: "lightgray" === color,
        [styles.color_accent]: "accent" === color,
        [styles.color_error]: "error" === color,
        [styles.four]: weight === "four",
        [styles.five]: weight === "five",
        [styles.six]: weight === "six",
        [styles.seven]: weight === "seven",
    }

    switch (true) {
        case "h1" === tag:
            return <h1 className={classNames(styles.typography, mods, [className])}>{children}</h1>

        case "h2" === tag:
            return <h2 className={classNames(styles.typography, mods, [className])}>{children}</h2>

        case "h3" === tag:
            return <h3 className={classNames(styles.typography, mods, [className])}>{children}</h3>

        case "h4" === tag:
            return <h4 className={classNames(styles.typography, mods, [className])}>{children}</h4>

        case "h5" === tag:
            return <h5 className={classNames(styles.typography, mods, [className])}>{children}</h5>

        case "h6" === tag:
            return <h6 className={classNames(styles.typography, mods, [className])}>{children}</h6>

        case "p" === tag:
            return <p className={classNames(styles.typography, mods, [className])}>{children}</p>

        default:
            return null
    }
}
