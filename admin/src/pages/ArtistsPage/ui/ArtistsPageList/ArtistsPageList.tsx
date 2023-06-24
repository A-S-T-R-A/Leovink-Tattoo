import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ArtistsPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IArtistsData } from "../../types/types"

export function ArtistsPageList({ artistsData }: { artistsData: IArtistsData[] }) {
    return (
        <div className={styles.table}>
            {artistsData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index}</div>
                    <div className={styles.imgContainer}>
                        <ModalImage className={styles.img} url={item.img} />
                    </div>
                    <div>Name: {item.name}</div>
                    <div>Specialization: {item.specialization}</div>
                    <div className={styles.description}>Description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph artistData={item} id={index} />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
