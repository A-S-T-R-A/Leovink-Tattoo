import { GreatBritianFlag, MoldovaRepublicFlag, RussiaFlag } from "shared/ui/Icons"
import styles from "./Languages.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useRef, useState } from "preact/hooks"
import { Button } from "shared/ui/Button/Button"

type Language = "ro" | "en" | "ru"

export function Languages({ className }: { className?: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<Language>("ro")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function clickHandler(e: MouseEvent, language: Language) {
        e.stopPropagation()
        setDropdownOpen(false)
        setCurrentLanguage(language)
    }

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

        switch (currentLanguage) {
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
                languageFlag = <MoldovaRepublicFlag />
                break
        }

        return languageFlag
    })()

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
                        <Button onClick={e => clickHandler(e, "ro")} className={styles.language}>
                            <MoldovaRepublicFlag /> ro
                        </Button>
                        <Button onClick={e => clickHandler(e, "en")} className={styles.language}>
                            <GreatBritianFlag /> en
                        </Button>
                        <Button onClick={e => clickHandler(e, "ru")} className={styles.language}>
                            <RussiaFlag /> ru
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
