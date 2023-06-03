import { useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { NavigationList } from "../NavigationList/NavigationList"
import styles from "./Burger.module.scss"
import { SocialIcons } from "shared/components/SocialIcons"

export function Burger({ className }: { className?: string }) {
    const [isBurgerVisible, setIsBurgerVisible] = useState(false)

    function toggleBurger() {
        setIsBurgerVisible(prev => {
            document.body.style.overflow = prev ? "auto" : "hidden"
            return !prev
        })
    }

    return (
        <>
            <BurgerIcon className={className} onClick={toggleBurger} isOpen={isBurgerVisible} />
            <BurgerModalSlider isOpen={isBurgerVisible} onClose={toggleBurger} />
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

function BurgerModalSlider({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <>
            <div
                className={classNames(styles.sliderOverlay, { [styles.navOpen]: isOpen })}
                onClick={onClose}
            />

            <div className={classNames(styles.sliderWrapper, { [styles.navOpen]: isOpen })}>
                <div className={styles.sliderContainer}>
                    <NavigationList closeClickHandler={onClose} />
                    <SocialIcons />
                </div>
            </div>
        </>
    )
}
