import { Section } from "shared/ui/Section/Section"
import styles from "./Steps.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import type { IStepData } from "shared/const/firebaseVariables"
import { useState } from "preact/hooks"
import { ChevronDownIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

export function Steps({
    data,
    title,
    button,
}: {
    title: string
    button: string
    data: IStepData[] | null
}) {
    const [selected, setSelected] = useState(0)
    if (!data) return null

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
                            <Typography className={styles.index} tag="p" size="xxxl" color="base">
                                {"0" + (index + 1)}
                            </Typography>
                            <div className={styles.readMoreBtn} onClick={() => setSelected(index)}>
                                <Typography
                                    tag="p"
                                    size="m"
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
                                    tag="h3"
                                    size="xxl"
                                    color="base"
                                    weight="five"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    className={classNames(styles.description, {
                                        [styles.selectedDescription]: selected === index,
                                    })}
                                    tag="p"
                                    color="base"
                                    size="m"
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
