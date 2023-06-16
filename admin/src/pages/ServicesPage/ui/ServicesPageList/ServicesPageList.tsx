import { DeleteTattooImage } from "features/deleteTattooImage"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ServicesPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IServiceData } from "pages/ServicesPage/types/types"

export function ServicesPageList({
    serviceData,
    triggerRefetch,
}: {
    serviceData: IServiceData[]
    triggerRefetch?: () => void
}) {
    return (
        <div className={styles.table}>
            {serviceData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index + 1}</div>
                    {item.img.map(img => {
                        return <ModalImage className={styles.img} url={img} />
                    })}
                    <div>title: {item.title}</div>
                    <div className={styles.description}>description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph serviceData={serviceData} />
                        <DeleteTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                    </div>
                </div>
            ))}
        </div>
    )
}
