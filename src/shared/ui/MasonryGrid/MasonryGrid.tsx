import { ITattooImage } from "shared/types/types"
import styles from "./MasonryGrid.module.scss"

//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { EyeIcon } from "../Icons"

interface IMasonryGrid {
    data: ITattooImage[]
    onClick: (index: number) => void
}

export function MasonryGrid({ data, onClick }: IMasonryGrid) {
    return (
        <div className={styles.container}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
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
