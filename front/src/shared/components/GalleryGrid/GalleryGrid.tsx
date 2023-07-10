//import { data as d } from "shared/const/data"
import styles from "./GalleryGrid.module.scss"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "shared/types/types"
import type { ITattooImage } from "shared/const/firebaseVariables"
import { useState, useEffect, useRef } from "preact/hooks"
import { getMaximumColumnHeight } from "./lib/getMaximumColumnHeight"
import { getColumnsNumber } from "./lib/getColumnsNumber"
import { useDebounce } from "shared/lib/useDebounce/useDebounce"

interface IGalleryGrid {
    data: ITattooImage[]
    maxHeight?: string
    onClick?: (index: number) => void
    language: LanguageType
}

export function GalleryGrid({ data, onClick, maxHeight = "auto", language }: IGalleryGrid) {
    const [height, setHeight] = useState(50000)
    const [columns, setColumns] = useState(5)
    const [isInited, setIsInited] = useState(false)
    const gridContainerRef = useRef<HTMLDivElement | null>(null)

    function resetHeight() {
        const cols = getColumnsNumber(window.innerWidth)
        const h = getMaximumColumnHeight(gridContainerRef.current, cols)
        setColumns(cols)
        setHeight(h)
        setIsInited(true)
    }

    const debouncedResetHeight = useDebounce(resetHeight, 50)

    useEffect(() => {
        debouncedResetHeight()
        window.addEventListener("resize", debouncedResetHeight)
        return () => window.removeEventListener("resize", debouncedResetHeight)
    }, [])

    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <div
                className={styles.singleItemsContainer}
                style={{ display: isInited && data.length < columns ? "flex" : "none" }}
            >
                {data.map((item, index) => {
                    const { img, alt } = item
                    return (
                        <div
                            key={index}
                            className={styles.singleItem}
                            onClick={() => onClick?.(index)}
                        >
                            <img src={img} alt={alt[language]} />
                            <EyeIcon className={styles.eye} />
                        </div>
                    )
                })}
            </div>

            <div
                className={styles.gridContainer}
                style={{ height: `${height}px`, display: data.length < columns ? "none" : "flex" }}
                ref={gridContainerRef}
            >
                {data.map((item, index) => {
                    const { img, alt } = item
                    return (
                        <div key={index} className={styles.item} onClick={() => onClick?.(index)}>
                            <img src={img} alt={alt[language]} />
                            <EyeIcon className={styles.eye} />
                        </div>
                    )
                })}

                <span className={`${styles.item} ${styles.break}`}></span>
                <span className={`${styles.item} ${styles.break}`}></span>
                <span className={`${styles.item} ${styles.break}`}></span>
                <span className={`${styles.item} ${styles.break}`}></span>
            </div>
        </div>
    )
}
