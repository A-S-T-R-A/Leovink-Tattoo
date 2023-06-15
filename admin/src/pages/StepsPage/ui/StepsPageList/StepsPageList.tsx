import { DeleteTattooImage } from "features/deleteTattooImage"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./StepsPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IStepsData } from "pages/StepsPage/types/types"

export function StepsPageList({
    data,
    triggerRefetch,
}: {
    data: IStepsData[]
    triggerRefetch?: () => void
}) {
    return (
        <div className={styles.table}>
            {data.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>step: {item.id}</div>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>title: {item.title}</div>
                    <div>description: {item.description}</div>
                    <div>{item.isLive ? "Published" : "Unpublished"}</div>
                    <div className={styles.buttons}>
                        <EditParagraph />
                        <DeleteTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                    </div>
                </div>
            ))}
        </div>
    )
}
