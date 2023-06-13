import { classNames } from "../../shared/lib/classNames/classNames"
import { useEffect } from "preact/hooks"
import styles from "./Main.module.scss"
import layerBaseImg from "./const/layer-base.png"
import layerMiddleImg from "./const/layer-middle.png"
import layerFrontImg from "./const/layer-front.png"
import leovinkTitle from "./const/leovinkLogo.png"
import leovinkCaption from "./const/leovCaption.png"
import leovinkHorns from "./const/leovinkHorns.png"
import { ScrollIcon } from "shared/ui/ScrollIcon/ScrollIcon"

export function Main() {
    function scrollHandler() {
        document.documentElement.style.setProperty("--scrollTop", `${window.scrollY}px`)
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler)
    })

    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <img src={leovinkHorns} alt="" className={styles.horns} />
                    <img src={leovinkTitle} alt="" className={styles.title} />
                    <img src={leovinkCaption} alt="" className={styles.caption} />
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
                <ScrollIcon className={styles.scroll} />
            </div>
        </header>
    )
}
