import { useState } from "react"
import { Section } from "shared/ui/Section/Section"
import { servicesData } from "./const/data"
import { Typography, TypographyColor, TypographySize } from "shared/ui/Typography/Typography"
import { ArrowLeftIcon, ArrowUpIcon } from "shared/ui/Icons"
import styles from "./Services.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { CtaButton } from "shared/components/CtaButton/CtaButton"

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
                                <Typography
                                    className={styles.title}
                                    size={TypographySize.H3}
                                    color={TypographyColor.COLOR_LIGHTGRAY}
                                >
                                    {service}
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
                                <>
                                    <Typography
                                        className={styles.price}
                                        color={TypographyColor.COLOR_BASE}
                                        size={TypographySize.SMALL}
                                    >
                                        from {price}
                                    </Typography>
                                    <div className={styles.imgContainer}>
                                        {imgs.map(image => {
                                            return <img src={image} alt="pic" />
                                        })}
                                    </div>
                                    <CtaButton className={styles.btn} />
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </Section>
    )
}
