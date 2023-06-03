import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Art1us from "shared/assets/images/logo.webp"
import { Navbar } from "./Navbar/Navbar"
import { Burger } from "./Burger/Burger"
import { classNames } from "shared/lib/classNames/classNames"
import { useThrottle } from "shared/lib/useThrottle/useThrottle"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const scrollHandler = useThrottle(() => {
        setIsScrolled(window.window.pageYOffset > 15)
    }, 100)

    return (
        <>
            <Burger className={styles.burger} />
            <div className={classNames(styles.wrapper, { [styles.blur]: isScrolled })}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <img src={Art1us} className={styles.logo} alt="" />
                    </div>
                    <Navbar className={styles.navbar} />
                </div>
            </div>
        </>
    )
}
