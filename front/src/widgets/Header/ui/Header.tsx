import { useEffect, useState } from "preact/hooks"
import styles from "./Header.module.css"
import { Navbar } from "./Navbar/Navbar"
import { Burger } from "./Burger/Burger"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "shared/types/types"
import type { NavlistType } from "shared/const/firebaseVariables"
import type { ComponentChildren } from "preact"
import type { ISocialMedia } from "shared/types/IGlobalData"

export function Header({
    language,
    data,
    children,
    defaultLanguage,
    socialsData,
}: {
    children: ComponentChildren
    language: LanguageType
    data: { [key: number]: { link: string; text: string } } | null
    defaultLanguage: LanguageType
    socialsData: ISocialMedia[]
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

    if (!data) return null

    return (
        <>
            <Burger
                language={language}
                defaultLanguage={defaultLanguage}
                className={styles.burger}
                data={data}
                socialsData={socialsData}
            />
            <section className={classNames(styles.wrapper, { [styles.blur]: isScrolled })}>
                <div className={styles.container}>
                    {children}
                    <Navbar
                        className={styles.navbar}
                        language={language}
                        defaultLanguage={defaultLanguage}
                        data={data}
                        socialsData={socialsData}
                    />
                </div>
            </section>
        </>
    )
}
