import { Typography } from "shared/ui/Typography/Typography"
import type { IArtistData } from "../types/types"
import styles from "./ArtistCard.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { ArrowDownIcon } from "shared/ui/Icons"

export function ArtistCard({ data }: { data: IArtistData }) {
    const { img, name, description, specialization } = data

    return (
        <div className={styles.container}>
            <img src={img} alt="" className={styles.img} />
            <Typography variant="h2" component="xxxl" className={styles.name}>
                {name}
            </Typography>
            <Typography variant="h5" component="s" className={styles.specialization}>
                {specialization}
            </Typography>
            <Typography variant="h5" component="s" className={styles.description}>
                {description}
            </Typography>
            <AppLink to="/artist" className={styles.view}>
                view gallery <ArrowDownIcon />
            </AppLink>
        </div>
    )
}
