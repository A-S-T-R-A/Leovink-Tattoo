import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { stepsData } from "./const/data"
import { DesktopLayout } from "./ui/DesctopLayout/DesktopLayout"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { MobileLayout } from "./ui/MobileLayout/MobileLayout"
import { LaptopLayout } from "./ui/LaptopLayout/LaptopLayout"
import { Children } from "preact/compat"

export function Steps() {
    const stepsInfo = stepsData.map(item => {
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
    })

    return (
        <Section title="How It Works">
            <DesktopLayout className={styles.desktop}>{stepsInfo}</DesktopLayout>
            <LaptopLayout className={styles.desktop}>{stepsInfo}</LaptopLayout>
            <MobileLayout className={styles.mobile}>{stepsInfo}</MobileLayout>
            <CtaButton className={styles.btn} />
        </Section>
    )
}
