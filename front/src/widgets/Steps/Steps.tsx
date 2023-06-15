import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import type { IStepData } from "shared/const/firebaseVariables"

export function Steps({
    data = [],
    title,
    button,
}: {
    data: IStepData[]
    title: string
    button: string
}) {
    return (
        <Section title={title}>
            <div className={styles.container}>
                {data.map((item, index) => {
                    const { title, img, description } = item
                    return (
                        <div className={styles.stepContainer}>
                            <div key={index} className={styles.imgContainer}>
                                <img src={img} alt="step" className={styles.img} />
                            </div>
                            <Typography
                                className={styles.title}
                                variant="h4"
                                component="xl"
                                color="base"
                            >
                                {"0" + (index + 1)}. {title}
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
            <CtaButton className={styles.btn} text={button} />
        </Section>
    )
}

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
