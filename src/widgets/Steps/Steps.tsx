import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography, TypographySize } from "shared/ui/Typography/Typography"
import { stepsData } from "./const/data"
import { DesktopLayout } from "./ui/DesctopLayout/DesktopLayout"
import { CtaButton } from "shared/components/CtaButton/CtaButton"

export function Steps() {
    return (
        <Section title="How It Works">
            <DesktopLayout>
                {stepsData.map(item => {
                    const { id, step, title, img } = item
                    return (
                        <>
                            <div key={id} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography size={TypographySize.H4}>
                                {step}. {title}
                            </Typography>
                        </>
                    )
                })}
            </DesktopLayout>
            <CtaButton className={styles.btn} />
        </Section>
    )
}
