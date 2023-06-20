import { useEffect, useState } from "preact/hooks"
import { classNames } from "shared/lib/classNames/classNames"
import { NavigationList } from "../NavigationList/NavigationList"
import styles from "./Burger.module.scss"
import { SocialIcons } from "shared/components/SocialIcons/SocialIcons"
import { disableScroll } from "shared/lib/disableScroll/disableScroll"
import { Languages } from "../Languages/Languages"
import type { LanguageType } from "shared/types/types"
import type { NavlistType } from "shared/const/firebaseVariables"

export function Burger({
    className,
    language,
    defaultLanguage,
    data,
}: {
    className?: string
    language: LanguageType
    defaultLanguage: LanguageType
    data: NavlistType
}) {
    const [isBurgerVisible, setIsBurgerVisible] = useState(false)

    function toggleBurger() {
        setIsBurgerVisible(prev => !prev)
    }

    useEffect(() => {
        disableScroll(isBurgerVisible)
    }, [isBurgerVisible])

    return (
        <>
            <Languages
                language={language}
                defaultLanguage={defaultLanguage}
                className={styles.languages}
            />
            <BurgerIcon className={className} onClick={toggleBurger} isOpen={isBurgerVisible} />
            <BurgerModal data={data} isOpen={isBurgerVisible} onClose={toggleBurger} />
        </>
    )
}

function BurgerIcon(props: { className?: string; onClick: () => void; isOpen: boolean }) {
    const { className, onClick, isOpen } = props

    return (
        <div className={classNames(styles.icon, {}, [className])}>
            <div
                aria-label="toggle navigation"
                onClick={onClick}
                className={classNames(styles.container, { [styles.burgerOpen]: isOpen }, [
                    className,
                ])}
            >
                <span className={styles.hamburger}></span>
            </div>
        </div>
    )
}

function BurgerModal({
    isOpen,
    onClose,
    data,
}: {
    isOpen: boolean
    onClose: () => void
    data: NavlistType
}) {
    return (
        <>
            <div
                className={classNames(styles.overlay, { [styles.navOpen]: isOpen })}
                onClick={onClose}
            />

            <div className={classNames(styles.wrapper, { [styles.navOpen]: isOpen })}>
                <div className={styles.container}>
                    <NavigationList data={data} closeClickHandler={onClose} />
                    <SocialIcons />
                </div>
            </div>
        </>
    )
}
