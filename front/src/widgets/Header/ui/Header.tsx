import { useEffect, useState } from "preact/hooks"
import styles from "./Header.module.css"
import logo from "shared/assets/images/logo.png"
import { Navbar } from "./Navbar/Navbar"
import { Burger } from "./Burger/Burger"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "../types/type"
import type { NavlistType } from "shared/const/firebaseVariables"

export function Header({ language, data }: { language: LanguageType; data: NavlistType }) {
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
                    <div className={styles.logoContainer}>
                        <img src={logo} className={styles.logo} alt="" />
                    </div>
                    <Navbar className={styles.navbar} language={language} data={data} />
                </div>
            </div>
        </>
    )
}
