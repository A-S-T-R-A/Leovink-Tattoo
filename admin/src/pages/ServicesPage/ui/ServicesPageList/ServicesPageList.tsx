import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ServicesPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IServiceData } from "pages/ServicesPage/types/types"

export function ServicesPageList({ serviceData }: { serviceData: IServiceData[] }) {
    return (
        <div className={styles.table}>
            {serviceData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index + 1}</div>
                    <div className={styles.imgContainer}>
                        {item.img.map(img => {
                            return <ModalImage className={styles.img} url={img} />
                        })}
                    </div>
                    <div>title: {item.title}</div>
                    <div className={styles.description}>Description: {item.description}</div>
                    <div className={styles.buttons}>
                        <EditParagraph serviceData={serviceData} />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
