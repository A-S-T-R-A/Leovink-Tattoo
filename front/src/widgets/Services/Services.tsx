import { useState } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { servicesData } from "./const/data"
import { Typography } from "shared/ui/Typography/Typography"
import { ArrowUpIcon } from "shared/ui/Icons/ArrowUpIcon"
import styles from "./Services.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import { ArrowDownIcon } from "shared/ui/Icons"

export function Services() {
    const [open, setOpen] = useState<number>(-1)

    function clickHandler(index: number) {
        if (open !== index) {
            setOpen(index)
        } else {
            setOpen(-1)
        }
    }

    return (
        <Section title="Services">
            <ul className={styles.servicesContainer}>
                {servicesData.map((services, index) => {
                    const { service, imgs, text } = services

                    return (
                        <>
                            <li className={styles.serviceContainer}>
                                <div
                                    className={styles.serviceClick}
                                    onClick={() => clickHandler(index)}
                                >
                                    <Typography className={styles.title}>
                                        0{index + 1}. {service}
                                        <ArrowDownIcon
                                            className={classNames(
                                                styles.arrowIcon,
                                                { [styles.open]: open === index },
                                                []
                                            )}
                                        />
                                    </Typography>
                                </div>
                                <div
                                    className={classNames(
                                        styles.content,
                                        {
                                            [styles.isOpen]: open === index,
                                            [styles.isClose]: open !== index,
                                        },
                                        []
                                    )}
                                >
                                    <div>
                                        <Typography
                                            className={styles.description}
                                            color="lightgray"
                                        >
                                            {text}
                                        </Typography>
                                        <div className={styles.imgContainer}>
                                            {imgs.map(image => {
                                                return <img src={image} alt="pic" />
                                            })}
                                        </div>
                                        <CtaButton className={styles.btn} />
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })}
            </ul>
        </Section>
    )
}
