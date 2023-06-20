import type { ITattooImage } from "shared/types/types"
//import { data as d } from "shared/const/data"
import styles from "./GalleryGrid.module.scss"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

interface IGalleryGrid {
    data: ITattooImage[]
    maxHeight?: string
    onClick?: (index: number) => void
}

export function GalleryGrid({ data, onClick, maxHeight = "auto" }: IGalleryGrid) {
    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <div className={styles.gridContainer}>
                {data.map((item, index) => {
                    const { img } = item
                    return (
                        <div
                            key={index}
                            className={styles.imgContainer}
                            onClick={() => onClick?.(index)}
                        >
                            <img src={img} alt="" />
                            <EyeIcon className={styles.eye} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
