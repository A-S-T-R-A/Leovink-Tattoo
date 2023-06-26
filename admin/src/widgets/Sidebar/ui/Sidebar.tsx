import { useUserRole } from "features/authByGoogle"
import styles from "./Sidebar.module.scss"
import { Link } from "react-router-dom"

export function Sidebar({ setSection, section }: { setSection: any; section: string }) {
    const user = useUserRole()
    function clickHandler(currentSection: string) {
        setSection(currentSection)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link
                    className={`${styles.link} ${section === "Home" && styles.currentLink}`}
                    onClick={() => clickHandler("Home")}
                    to="/"
                >
                    Home
                </Link>
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${
                            section === "Portfolio" && styles.currentLink
                        }`}
                        onClick={() => clickHandler("Portfolio")}
                        to="/portfolio"
                    >
                        Portfolio
                    </Link>
                )}
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${section === "Steps" && styles.currentLink}`}
                        onClick={() => clickHandler("Steps")}
                        to="/steps"
                    >
                        Steps
                    </Link>
                )}
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${section === "Services" && styles.currentLink}`}
                        onClick={() => clickHandler("Services")}
                        to="/services"
                    >
                        Services
                    </Link>
                )}
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${section === "Reviews" && styles.currentLink}`}
                        onClick={() => clickHandler("Reviews")}
                        to="/reviews"
                    >
                        Reviews
                    </Link>
                )}
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${section === "Artists" && styles.currentLink}`}
                        onClick={() => clickHandler("Artists")}
                        to="/artists"
                    >
                        Artists
                    </Link>
                )}
                {user !== "none" && (
                    <Link
                        className={`${styles.link} ${section === "FAQ" && styles.currentLink}`}
                        onClick={() => clickHandler("FAQ")}
                        to="/faq"
                    >
                        FAQ
                    </Link>
                )}
                {user === "dev" && (
                    <Link
                        className={`${styles.link} ${section === "Contacts" && styles.currentLink}`}
                        onClick={() => clickHandler("Contacts")}
                        to="/contacts"
                    >
                        *Contacts
                    </Link>
                )}
                {user === "dev" && (
                    <Link
                        className={`${styles.link} ${section === "Other" && styles.currentLink}`}
                        onClick={() => clickHandler("Other")}
                        to="/other"
                    >
                        *Other
                    </Link>
                )}
                {user === "dev" && (
                    <Link
                        className={`${styles.link} ${section === "Test" && styles.currentLink}`}
                        onClick={() => clickHandler("Test")}
                        to="/test"
                    >
                        *Test
                    </Link>
                )}
            </div>
        </div>
    )
}
