import styles from "./Main.module.scss"
import leovinkTitle from "./const/leovinkLogo.png"
import leovinkCaption from "./const/leovCaption.png"
import leovinkHorns from "./const/leovinkHorns.png"

export function Main() {
    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <img src={leovinkHorns} alt="leovink tattoo" className={styles.horns} />
                <img src={leovinkTitle} alt="leovink tattoo" className={styles.title} />
                <img src={leovinkCaption} alt="tattoo & piercing" className={styles.caption} />
            </div>
        </header>
    )
}
