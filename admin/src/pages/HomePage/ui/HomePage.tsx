import leovinkHorns from "../const/leovinkHorns.png"
import styles from "./HomePage.module.scss"

export function HomePage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.filter} />
            <img src={leovinkHorns} alt="Tattoo parlor in Chisinau" className={styles.horns} />
            <div className={styles.textContainer}>
                <p className={styles.first}>Welcome to the Leovink Tattoo admin panel</p>
                <p className={styles.second}>Please login to proceed</p>
            </div>
        </div>
    )
}
