//import { data as d } from "shared/const/data"
import styles from "./GalleryGrid.module.scss"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "shared/types/types"
import type { ITattooImage } from "shared/const/firebaseVariables"

interface IGalleryGrid {
    data: ITattooImage[]
    maxHeight?: string
    onClick?: (index: number) => void
    language: LanguageType
}

export function GalleryGrid({ data, onClick, maxHeight = "auto", language }: IGalleryGrid) {
    /* function formatImagesRowByRow(data, columns = 5) {
        const res = []

        for (let i = 0; i < columns - 1; i++) {
            res.push([])
        }

        for (let i = 0; i < data.length; i++) {
            res[i % (columns - 1)].push(data[i])
        }

        return res.flat()
    } */

    const formatedImages = data // formatImagesRowByRow(data) as ITattooImage[]

    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <div className={styles.gridContainer}>
                {formatedImages.map((item, index) => {
                    const { img, alt } = item
                    return (
                        <div
                            key={index}
                            className={styles.imgContainer}
                            onClick={() => onClick?.(index)}
                        >
                            <img src={img} alt={alt[language]} />
                            <EyeIcon className={styles.eye} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
