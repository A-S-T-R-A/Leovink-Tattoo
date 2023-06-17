import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Testimonial.module.scss"
import { CtaButton } from "shared/components/CtaButton/CtaButton"
import type { ITestimonialsData } from "shared/const/firebaseVariables"

export function Testimonial({
    isReversed,
    isWithBorder,
    data,
    cta,
}: {
    data: ITestimonialsData
    isReversed?: boolean
    isWithBorder?: boolean
    cta: string
}) {
    const { title, description, duration, artist, preview, video } = data

    return (
        <div
            className={styles.container}
            style={{
                //flexDirection: isReversed ? "row-reverse" : "row",
                borderBottom: isWithBorder ? "1px solid var(--color-darkgray)" : "",
            }}
        >
            <div className={styles.videoContainer}>
                <video src={video} poster={preview} controls />
            </div>
            <div className={styles.infoContainer}>
                <Typography isBold className={styles.title}>
                    {title}
                </Typography>
                <Typography className={styles.description}>{description}</Typography>
                <div className={styles.info}>
                    <Typography>
                        <span className={styles.bold}>tattoo artist:</span> {artist}
                    </Typography>
                    <Typography>
                        <span className={styles.bold}>duration:</span> {duration}
                    </Typography>
                </div>
                <CtaButton text={cta} />
            </div>
        </div>
    )
}
