import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import type { IStepData } from "shared/const/firebaseVariables"
import { useState } from "preact/hooks"
import { Button } from "shared/ui/Button/Button"
import { ChevronDownIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

export function Steps({
    data = [],
    title,
    button,
}: {
    data: IStepData[]
    title: string
    button: string
}) {
    const [selected, setSelected] = useState(0)

    return (
        <Section title={title}>
            <div className={styles.container}>
                {data.map((item, index) => {
                    const { title, img, description } = item
                    return (
                        <div
                            className={styles.stepContainer}
                            style={{ flex: index === selected ? "3" : "2" }}
                        >
                            <img src={img} alt="step" className={styles.img} />
                            <Typography
                                className={styles.index}
                                variant="h4"
                                component="xxxl"
                                color="base"
                            >
                                {"0" + (index + 1)}
                            </Typography>
                            <div className={styles.readMoreBtn} onClick={() => setSelected(index)}>
                                <Typography
                                    variant="h4"
                                    component="m"
                                    color="accent"
                                    className={classNames(styles.readMore, {
                                        [styles.selectedReadMore]: selected === index,
                                    })}
                                >
                                    Read More
                                </Typography>
                                <ChevronDownIcon
                                    className={classNames(styles.chevron, {
                                        [styles.selectedChevron]: selected === index,
                                    })}
                                />
                            </div>
                            <div className={styles.textContainer}>
                                <Typography
                                    className={styles.title}
                                    variant="h4"
                                    component="xxl"
                                    color="base"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    className={classNames(styles.description, {
                                        [styles.selectedDescription]: selected === index,
                                    })}
                                    color="base"
                                    component="m"
                                >
                                    {description}
                                </Typography>
                            </div>
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

/* {data.map((item, index) => {
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
    })} */
