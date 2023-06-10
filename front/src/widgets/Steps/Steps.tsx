import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { stepsData } from "./const/data"
import { DesktopLayout } from "./ui/DesctopLayout/DesktopLayout"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { MobileLayout } from "./ui/MobileLayout/MobileLayout"
import { LaptopLayout } from "./ui/LaptopLayout/LaptopLayout"

export function Steps() {
    return (
        <Section title="How It Works">
            <DesktopLayout className={styles.desktop}>
                {stepsData.map(item => {
                    const { id, step, title, img } = item
                    return (
                        <>
                            <div key={id} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography>
                                {step}. {title}
                            </Typography>
                        </>
                    )
                })}
            </DesktopLayout>
            <LaptopLayout className={styles.desktop}>
                {stepsData.map(item => {
                    const { id, step, title, img } = item
                    return (
                        <>
                            <div key={id} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography>
                                {step}. {title}
                            </Typography>
                        </>
                    )
                })}
            </LaptopLayout>
            <MobileLayout className={styles.mobile}>
                {stepsData.map(item => {
                    const { id, step, title, img } = item
                    return (
                        <>
                            <div key={id} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography>
                                {step}. {title}
                            </Typography>
                        </>
                    )
                })}
            </MobileLayout>
            <CtaButton className={styles.btn} />
        </Section>
    )
}
