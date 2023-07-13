import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./StepsPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { ITranslatedStepsData } from "pages/StepsPage/types/types"
import { defaultLanguage } from "shared/const/languages"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"

export function StepsPageList({
    data,
    triggerRefetch,
}: {
    data: ITranslatedStepsData | null
    triggerRefetch: () => void
}) {
    return (
        <>
            <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
            <div className={styles.table}>
                {data?.[defaultLanguage]?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <div>id: {index}</div>
                        <div className={styles.imgContainer}>
                            Img: <ModalImage className={styles.img} url={item.img} />
                        </div>
                        <div>title: {item.title}</div>
                        <div>description: {item.description}</div>
                        <div className={styles.buttons}>
                            <EditParagraph data={data} triggerRefetch={triggerRefetch} id={index} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
