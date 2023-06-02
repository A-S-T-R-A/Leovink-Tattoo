import { ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Typography.module.scss"

export enum TypographySize {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    BASE = "base",
    SMALL = "small",
    EXTRA_SMALL = "extra_small",
}

export enum TypographyColor {
    COLOR_BASE = "color_base",
    COLOR_GRAY = "color_gray",
    COLOR_ACCENT = "color_accent",
    COLOR_ERROR = "color-error",
}

interface TypographyProps {
    className?: string
    children: ReactNode
    size?: TypographySize
    color?: TypographyColor
    isBold?: boolean
}

export function Typography(props: TypographyProps) {
    const {
        children,
        className,
        size = TypographySize.BASE,
        color = TypographyColor.COLOR_BASE,
        isBold,
        ...restProps
    } = props

    return (
        <div
            className={classNames(styles.typography, { [styles.bold]: isBold }, [
                className,
                styles[size],
                styles[color],
            ])}
            {...restProps}
        >
            {children}
        </div>
    )
}
