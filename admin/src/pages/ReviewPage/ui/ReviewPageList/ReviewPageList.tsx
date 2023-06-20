import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ReviewPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IReviewData } from "pages/ReviewPage/types/types"

export function ReviewPageList({ reviewData }: { reviewData: IReviewData[] }) {
    return (
        <div className={styles.table}>
            {reviewData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index + 1}</div>
                    <div className={styles.imgContainer}>
                        <ModalImage className={styles.img} url={item.preview} />
                        <video src={item.video}></video>
                    </div>
                    <div>title: {item.title}</div>
                    <div className={styles.description}>Description: {item.description}</div>
                    <div>Tattoo Artist: {item.tattoo_artist}</div>
                    <div>Duration: {item.duration}</div>
                    <div className={styles.buttons}>
                        <EditParagraph reviewData={reviewData} />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
