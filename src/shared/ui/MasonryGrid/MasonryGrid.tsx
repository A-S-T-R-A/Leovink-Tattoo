import { ITattooImage } from "shared/types/types"
import styles from "./MasonryGrid.module.scss"

//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface IMasonryGrid {
    data: ITattooImage[]
}

export function MasonryGrid({ data }: IMasonryGrid) {
    return (
        <div className={styles.container}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
                <Masonry gutter="5px">
                    {data.map(item => {
                        const { id, img } = item
                        return <img key={id} src={img} alt="" className={styles.img} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
