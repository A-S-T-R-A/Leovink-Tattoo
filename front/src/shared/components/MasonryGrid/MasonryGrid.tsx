import type { ITattooImage } from "shared/types/types"
import styles from "./MasonryGrid.module.scss"

//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { EyeIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

interface IMasonryGrid {
    data: ITattooImage[]
    maxHeight?: string
    onClick?: (index: number) => void
}

export function MasonryGrid({ data, onClick, maxHeight = "auto" }: IMasonryGrid) {
    return (
        <div
            className={classNames(styles.container, {
                [styles.withGradient]: maxHeight !== "auto",
            })}
            style={{ maxHeight }}
        >
            <ResponsiveMasonry columnsCountBreakPoints={{ 320: 2, 480: 3, 768: 4, 961: 5 }}>
                <Masonry gutter="6px">
                    {data.map((item, index) => {
                        const { id, img } = item
                        return (
                            <div
                                key={id}
                                className={styles.imgContainer}
                                onClick={() => onClick?.(index)}
                            >
                                <img src={img} alt="" />
                                <EyeIcon className={styles.eye} />
                            </div>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
