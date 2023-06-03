import { classNames } from "shared/lib/classNames/classNames"
import { useEffect } from "react"
import styles from "./Main.module.scss"
import layerBaseImg from "./const/layer-base.png"
import layerMiddleImg from "./const/layer-middle.png"
import layerFrontImg from "./const/layer-front.png"
import leovinkLogo from "./const/leovinkLogo.png"
import leovinkCaption from "./const/leovCaption.png"
import leovinkHorns from "./const/leovinkHorns.png"

export function Main() {
    function scrollHandler(e: Event) {
        document.documentElement.style.setProperty("--scrollTop", `${this.scrollY}px`) // Update method
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler)
    })

    return (
        <header className={styles.mainHeader}>
            <div className={styles.layers}>
                <div className={styles.layerHeader}>
                    <img src={leovinkHorns} alt="" className={styles.horns} />
                    <img src={leovinkCaption} alt="" className={styles.caption} />
                    <img src={leovinkLogo} alt="" className={styles.logo} />
                </div>
                <div
                    className={classNames(styles.layerBase, {}, [styles.layer])}
                    style={{ backgroundImage: `url(${layerBaseImg})` }}
                ></div>
                <div
                    className={classNames(styles.layerMiddle, {}, [styles.layer])}
                    style={{ backgroundImage: `url(${layerMiddleImg})` }}
                ></div>
                <div
                    className={classNames(styles.layerFront, {}, [styles.layer])}
                    style={{ backgroundImage: `url(${layerFrontImg})` }}
                ></div>
            </div>
        </header>
    )
}
