import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { stepsData } from "./const/data"
import { CtaButton } from "shared/components/CtaButton/CtaButton"

export function Steps() {
    /* const stepsInfo = stepsData.map(item => {
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
    })  */

    return (
        <Section title="How It Works">
            <div className={styles.container}>
                {stepsData.map(item => {
                    const { id, step, title, img, description } = item
                    return (
                        <div className={styles.stepContainer}>
                            <div key={id} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography
                                className={styles.title}
                                variant="h4"
                                component="xl"
                                color="base"
                            >
                                {step}. {title}
                            </Typography>
                            <Typography
                                className={styles.description}
                                color="lightgray"
                                component="m"
                            >
                                {description}
                            </Typography>
                        </div>
                    )
                })}
            </div>
            <CtaButton className={styles.btn} />
        </Section>
    )
}
