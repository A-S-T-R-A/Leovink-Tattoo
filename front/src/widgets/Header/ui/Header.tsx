import { useEffect, useState } from "preact/hooks"
import styles from "./Header.module.css"
import { Navbar } from "./Navbar/Navbar"
import { Burger } from "./Burger/Burger"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "shared/types/types"
import type { NavlistType } from "shared/const/firebaseVariables"
import type { ComponentChildren } from "preact"

export function Header({
    language,
    data,
    children,
}: {
    children: ComponentChildren
    language: LanguageType
    data: NavlistType
}) {
    const [isScrolled, setIsScrolled] = useState(false)

    const scrollHandler = () => {
        const boolean = window.pageYOffset > 15
        setIsScrolled(boolean)
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler)
    }, [])

    return (
        <>
            <Burger className={styles.burger} />
            <div className={classNames(styles.wrapper, { [styles.blur]: isScrolled })}>
                <div className={styles.container}>
                    {children}
                    <Navbar className={styles.navbar} language={language} data={data} />
                </div>
            </div>
        </>
    )
}
