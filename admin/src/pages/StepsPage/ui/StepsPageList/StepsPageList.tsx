import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./StepsPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { ITranslatedStepsData } from "pages/StepsPage/types/types"

export function StepsPageList({
    data,
    triggerRefetch,
}: {
    data: ITranslatedStepsData | null
    triggerRefetch: () => void
}) {
    return (
        <div className={styles.table}>
            {data?.["en"]?.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index}</div>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>title: {item.title}</div>
                    <div>description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph
                            length={data?.["en"].length || 0}
                            data={data}
                            triggerRefetch={triggerRefetch}
                            id={index}
                        />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
