import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { fetchSectionData, type IStepData } from "shared/const/firebaseVariables"
import { useState } from "preact/hooks"
import { ChevronDownIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

const data = (await fetchSectionData("en", "steps")) as IStepData[]

export function Steps({ title, button }: { title: string; button: string }) {
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
