//import { data as d } from "shared/const/data"
import styles from "./GalleryGrid.module.scss"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"
import type { LanguageType } from "shared/types/types"
import type { ITattooImage } from "shared/const/firebaseVariables"
import { useState, useEffect, useRef } from "preact/hooks"
import { getMaximumColumnHeight } from "./lib/getMaximumColumnHeight"
import { getColumnsNumber } from "./lib/getColumnsNumber"
import { useThrottle } from "shared/lib/useThrottle/useThrottle"
import { useDebounce } from "shared/lib/useDebounce/useDebounce"

interface IGalleryGrid {
    data: ITattooImage[]
    maxHeight?: string
    onClick?: (index: number) => void
    language: LanguageType
}

export function GalleryGrid({ data, onClick, maxHeight = "auto", language }: IGalleryGrid) {
    const [height, setHeight] = useState(50000)
    const gridContainerRef = useRef<HTMLDivElement | null>(null)

    function resetHeight() {
        const columns = getColumnsNumber(window.innerWidth)
        const h = getMaximumColumnHeight(gridContainerRef.current, columns)
        setHeight(h)
    }

    const debouncedResetHeight = useDebounce(resetHeight, 50)

    useEffect(() => {
        debouncedResetHeight()
        window.addEventListener("resize", debouncedResetHeight)
        return window.removeEventListener("resize", debouncedResetHeight)
    }, [])

    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <div
                className={styles.gridContainer}
                style={{ height: `${height}px` }}
                ref={gridContainerRef}
            >
                {data.map((item, index) => {
                    const { img, alt } = item
                    return (
                        <figure
                            key={index}
                            className={styles.item}
                            onClick={() => onClick?.(index)}
                        >
                            <img src={img} alt={alt[language]} />
                            <EyeIcon className={styles.eye} />
                        </figure>
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
