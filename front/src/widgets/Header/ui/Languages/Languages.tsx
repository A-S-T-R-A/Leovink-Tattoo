import { GreatBritianFlag, MoldovaRepublicFlag, RussiaFlag } from "shared/ui/Icons"
import styles from "./Languages.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useEffect, useRef, useState } from "preact/hooks"
import type { LanguageType } from "../../types/type"

export function Languages({ className, language }: { className?: string; language: LanguageType }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function onMouseEnterHandler() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    function mouseLeaveHandler() {
        const delay = window.innerWidth < 769 ? 0 : 400

        timeoutRef.current = setTimeout(() => {
            setDropdownOpen(false)
        }, delay)
    }

    const LanguageFlag = (() => {
        let languageFlag

        switch (language) {
            case "ro":
                languageFlag = <MoldovaRepublicFlag />
                break
            case "ru":
                languageFlag = <RussiaFlag />
                break
            case "en":
                languageFlag = <GreatBritianFlag />
                break
            default:
                languageFlag = <GreatBritianFlag />
                break
        }

        return languageFlag
    })()

    function localizedLink(lang: LanguageType) {
        const url = window.location.href
        const to = "/" + url.split(".").pop()?.split("/").pop()
        return lang === "en" ? to : "/" + lang + to
    }

    return (
        <div
            onClick={() => setDropdownOpen(prev => !prev)}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={classNames(styles.languages, {}, [className])}
        >
            <div className={styles.dropdownContainer}>
                {LanguageFlag}
                {dropdownOpen && (
                    <div className={styles.dropdown}>
                        <a href={localizedLink("ro")} className={styles.language}>
                            <MoldovaRepublicFlag /> RO
                        </a>
                        <a href={localizedLink("en")} className={styles.language}>
                            <GreatBritianFlag /> EN
                        </a>
                        <a href={localizedLink("ru")} className={styles.language}>
                            <RussiaFlag /> RU
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
