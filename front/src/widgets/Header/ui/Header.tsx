import { useEffect, useState } from "preact/hooks"
import styles from "./Header.module.css"
import logo from "shared/assets/images/logo.png"
import horns from "widgets/Main/const/leovinkHorns.png"
import leovinkTattoo from "widgets/Main/const/leovinkLogo.png"
import { Navbar } from "./Navbar/Navbar"
import { Burger } from "./Burger/Burger"
import { classNames } from "shared/lib/classNames/classNames"
import { Languages } from "./Languages/Languages"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [llogo, setLlogo] = useState(2)

    const scrollHandler = () => {
        const boolean = window.pageYOffset > 15
        setIsScrolled(boolean)
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler)
    }, [])

    let currentLogo = llogo === 1 ? logo : llogo === 2 ? leovinkTattoo : horns

    return (
        <>
            <Burger className={styles.burger} />
            <div className={classNames(styles.wrapper, { [styles.blur]: isScrolled })}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <img
                            src={currentLogo}
                            className={classNames(
                                "",
                                {
                                    [styles.logo]: llogo === 1,
                                    [styles.logoTattoo]: llogo === 2,
                                    [styles.horns]: llogo === 3,
                                },
                                []
                            )}
                            alt=""
                        />
                    </div>
                    <Navbar className={styles.navbar} />
                </div>
            </div>
            <button
                onClick={() => setLlogo(1)}
                style={{
                    position: "absolute",
                    left: "0",
                    top: "10%",
                    zIndex: "1000",
                }}
            >
                leovink
            </button>
            <button
                onClick={() => setLlogo(2)}
                style={{ position: "absolute", left: "130px", top: "10%", zIndex: "1000" }}
            >
                leovink tattoo
            </button>
            <button
                onClick={() => setLlogo(3)}
                style={{ position: "absolute", left: "70px", top: "10%", zIndex: "1000" }}
            >
                horns
            </button>
        </>
    )
}
