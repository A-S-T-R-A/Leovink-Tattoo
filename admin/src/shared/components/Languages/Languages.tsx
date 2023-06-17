import { useRef, useState } from "react"
import { GreatBritianFlag, MoldovaRepublic, RussiaFlag } from "./Icons/index"
import styles from "./Languages.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Button } from "shared/ui/Button/Button"
import { LanguageType } from "shared/types/types"

export function Languages({
    className,
    currentLanguage,
    onChangeLanguage,
}: {
    className?: string
    currentLanguage: LanguageType
    onChangeLanguage: (language: LanguageType) => void
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function clickHandler(e: React.MouseEvent, language: LanguageType) {
        e.stopPropagation()
        setDropdownOpen(false)
        onChangeLanguage(language)
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
                languageFlag = <MoldovaRepublic />
                break
            case "ru":
                languageFlag = <RussiaFlag />
                break
            case "en":
                languageFlag = <GreatBritianFlag />
                break
            default:
                languageFlag = <MoldovaRepublic />
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
                            <MoldovaRepublic /> ro
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
