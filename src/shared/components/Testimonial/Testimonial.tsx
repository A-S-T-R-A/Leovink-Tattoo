import { Typography, TypographyColor, TypographySize } from "shared/ui/Typography/Typography"
import styles from "./Testimonial.module.scss"
import video from "./const/testimonial.mp4"
import poster from "./const/testimonial1.jpg"
import { CtaButton } from "../CtaButton/CtaButton"

export function Testimonial({
    isReversed,
    isWithBorder,
}: {
    isReversed?: boolean
    isWithBorder?: boolean
}) {
    return (
        <div
            className={styles.container}
            style={{
                flexDirection: isReversed ? "row-reverse" : "row",
                borderBottom: isWithBorder ? "1px solid var(--color-darkgray)" : "",
            }}
        >
            <div className={styles.left}>
                <video src={video} poster={poster} controls />
            </div>
            <div className={styles.right}>
                <Typography size={TypographySize.H2} isBold className={styles.title}>
                    Polynesian tribe tattoo
                </Typography>
                <Typography color={TypographyColor.COLOR_LIGHTGRAY} className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptas
                    inventore voluptatibus fugit tenetur, numquam suscipit provident sequi nobis
                    soluta ab laudantium esse dolor vitae est quae asperiores libero porro aut odit
                    quia! Laborum, iure sint. Laboriosam error hic, natus quae esse dolor, voluptate
                    sint explicabo quam, totam aspernatur cupiditate.
                </Typography>
                <div className={styles.info}>
                    <Typography color={TypographyColor.COLOR_LIGHTGRAY}>
                        <span className={styles.bold}>tattoo artist:</span> Nastia
                    </Typography>
                    <Typography color={TypographyColor.COLOR_LIGHTGRAY}>
                        <span className={styles.bold}>price:</span> 150 eur
                    </Typography>
                    <Typography color={TypographyColor.COLOR_LIGHTGRAY}>
                        <span className={styles.bold}>duration:</span> 14 hours
                    </Typography>
                </div>
                <CtaButton />
            </div>
        </div>
    )
}
