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
                    <div>id: {index + 1}</div>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>title: {item.title}</div>
                    <div>description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph stepData={data} />
                        <DeleteTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                    </div>
                </div>
            ))}
        </div>
    )
}