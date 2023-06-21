import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ArtistPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IArtistData } from "pages/ArtistPage/types/types"

export function ArtistPageList({ artistData }: { artistData: IArtistData[] }) {
    return (
        <div className={styles.table}>
            {artistData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index + 1}</div>
                    <div className={styles.imgContainer}>
                        <ModalImage className={styles.img} url={item.photo} />
                    </div>
                    <div>Name: {item.name}</div>
                    <div>Specialization: {item.specialization}</div>
                    <div className={styles.description}>Description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph artistData={artistData} />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
