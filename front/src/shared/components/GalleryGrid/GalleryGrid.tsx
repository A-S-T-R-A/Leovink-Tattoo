//import { data as d } from "shared/const/data"
import styles from "./GalleryGrid.module.scss"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"
import type { IImagesData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"

interface IGalleryGrid {
    data: IImagesData[]
    maxHeight?: string
    onClick?: (index: number) => void
    language: LanguageType
}

export function GalleryGrid({ data, onClick, maxHeight = "auto", language }: IGalleryGrid) {
    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <div className={styles.gridContainer}>
                {data.map((item, index) => {
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
