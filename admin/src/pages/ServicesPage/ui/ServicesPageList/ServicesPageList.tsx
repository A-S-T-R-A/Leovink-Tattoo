import { useEffect, useState } from "react"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ServicesPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IServiceData, ITranslatedServiceData } from "../../types/types"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { defaultLanguage } from "shared/const/languages"
import { DeleteParagraph } from "../DeleteParagraph/DeleteParagraph"
import { AddServiceModal } from "../AddServiceModal/AddServiceModal"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"

export function ServicesPageList() {
    const [data, setData] = useState<ITranslatedServiceData | null>(null)

    async function fetch() {
        const en = (await fetchSectionData("en", "services")) as IServiceData[]
        const ro = (await fetchSectionData("ro", "services")) as IServiceData[]
        const ru = (await fetchSectionData("ru", "services")) as IServiceData[]
        setData({ en, ro, ru })
    }

    function triggerRefetch() {
        setData(null)
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <AddServiceModal data={data} triggerRefetch={triggerRefetch} />
            <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
            <div className={styles.table}>
                {data?.[defaultLanguage].map((item, index) => (
                    <div className={styles.item} key={index}>
                        <div>id: {index}</div>
                        <div className={styles.imgContainer}>
                            {item.images.map(img => {
                                return <ModalImage className={styles.img} url={img} />
                            })}
                        </div>
                        <div>title: {item.title}</div>
                        <div className={styles.description}>Description: {item.description}</div>
                        <div className={styles.buttons}>
                            <EditParagraph data={data} id={index} triggerRefetch={triggerRefetch} />
                            <DeleteParagraph
                                data={data}
                                id={index}
                                triggerRefetch={triggerRefetch}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
