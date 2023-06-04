import { Typography, TypographyColor, TypographySize } from "shared/ui/Typography/Typography"
import { IArtistData } from "../types/types"
import styles from "./ArtistCard.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { ArrowDownIcon } from "shared/ui/Icons"

export function ArtistCard({ data }: { data: IArtistData }) {
    const { img, name, description, specialization } = data

    return (
        <div className={styles.container}>
            <img src={img} alt="" className={styles.img} />
            <Typography size={TypographySize.H2} className={styles.name}>
                {name}
            </Typography>
            <Typography
                size={TypographySize.SMALL}
                color={TypographyColor.COLOR_LIGHTGRAY}
                className={styles.specialization}
            >
                {specialization}
            </Typography>
            <Typography
                size={TypographySize.SMALL}
                color={TypographyColor.COLOR_LIGHTGRAY}
                className={styles.description}
            >
                {description}
            </Typography>
            <AppLink to="/artist" className={styles.view}>
                view gallery <ArrowDownIcon />
            </AppLink>
        </div>
    )
}
