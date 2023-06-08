import { useState } from "react"
import { Section } from "../../shared/ui/Section/Section"
import { servicesData } from "./const/data"
import { Typography } from "../../shared/ui/Typography/Typography"
import { ArrowUpIcon } from "../../shared/ui/Icons/ArrowUpIcon"
import styles from "./Services.module.scss"
import { classNames } from "../../shared/lib/classNames/classNames"
import { CtaButton } from "../../shared/components/CtaButton/CtaButton"

export function Services() {
    const [open, setOpen] = useState(0)

    function clickHandler(index: number) {
        setOpen(index)
    }

    return (
        <Section title="Services">
            <ul className={styles.servicesContainer}>
                {servicesData.map((services, index) => {
                    const { service, imgs, price } = services

                    return (
                        <li className={styles.serviceContainer}>
                            <div
                                className={styles.serviceClick}
                                onClick={() => clickHandler(index)}
                            >
                                <Typography className={styles.title}>
                                    0{index + 1}. {service}
                                    <ArrowUpIcon
                                        className={classNames(
                                            styles.arrowIcon,
                                            { [styles.open]: open === index },
                                            []
                                        )}
                                    />
                                </Typography>
                            </div>
                            {open === index && (
                                <div className={styles.content}>
                                    <Typography className={styles.price}>from {price}</Typography>
                                    <div className={styles.imgContainer}>
                                        {imgs.map(image => {
                                            return <img src={image} alt="pic" />
                                        })}
                                    </div>
                                    <CtaButton className={styles.btn} />
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </Section>
    )
}
