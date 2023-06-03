import { ITattooImage } from "shared/types/types"
import styles from "./MasonryGrid.module.scss"

//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface IMasonryGrid {
    data: ITattooImage[]
    onClick: (index: number) => void
}

export function MasonryGrid({ data, onClick }: IMasonryGrid) {
    return (
        <div className={styles.container}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
                <Masonry gutter="5px">
                    {data.map((item, index) => {
                        const { id, img } = item
                        return (
                            <img
                                key={id}
                                src={img}
                                alt=""
                                className={styles.img}
                                onClick={() => onClick?.(index)}
                            />
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
