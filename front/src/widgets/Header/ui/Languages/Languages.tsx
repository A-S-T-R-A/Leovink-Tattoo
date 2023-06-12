import { GreatBritianFlag, MoldovaRepublicFlag, RussiaFlag } from "shared/ui/Icons"
import styles from "./Languages.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useRef, useState } from "preact/hooks"
import { Button } from "shared/ui/Button/Button"

export function Languages({ className }: { className?: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState("")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function clickHandler(language: string) {
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

    return (
        <div
            onClick={() => setDropdownOpen(prev => !prev)}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={classNames(styles.languages, {}, [className])}
        >
            <div className={styles.dropdownContainer}>
                {languageFlag}
                {dropdownOpen && (
                    <div className={styles.dropdown}>
                        <Button
                            onClick={e => {
                                e.stopPropagation()
                                clickHandler("ro")
                            }}
                            className={styles.language}
                        >
                            <MoldovaRepublicFlag /> ro
                        </Button>
                        <Button
                            onClick={e => {
                                e.stopPropagation()
                                clickHandler("en")
                            }}
                            className={styles.language}
                        >
                            <GreatBritianFlag /> en
                        </Button>
                        <Button
                            onClick={e => {
                                e.stopPropagation()
                                clickHandler("ru")
                            }}
                            className={styles.language}
                        >
                            <RussiaFlag /> ru
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
