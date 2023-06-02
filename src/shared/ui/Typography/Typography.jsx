/* eslint-disable react/prop-types */
import { classNames } from "../../lib/classNames"
import styles from "./Typography.module.scss"

const typographySize = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    base: "base",
    small: "small",
    extra_small: "extra_small",
}

const typographyColor = {
    color_base: "color_base",
    color_accent: "color_accent",
}

export function Typography({ children, variant = "base", color = "base_color", className }) {
    const fontSize = typographySize[variant]
    const typeColor = typographyColor[color]

    return (
        <div
            className={classNames(styles.typography, {}, [
                className,
                styles[fontSize],
                styles[typeColor],
            ])}
        >
            {children}
        </div>
    )
}
