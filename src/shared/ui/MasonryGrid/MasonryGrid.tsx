import styles from "./MasonryGrid.module.scss"
import { data as dummyData } from "./const/data"
import { ITattooImage } from "./types/types"
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface IMasonryGrid {
    data?: ITattooImage[]
}

export function MasonryGrid({ data }: IMasonryGrid) {
    return (
        <div className={styles.container}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
                <Masonry gutter="5px">
                    {dummyData.map(item => {
                        const { id, img } = item
                        return <img key={id} src={img} alt="" className={styles.img} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
