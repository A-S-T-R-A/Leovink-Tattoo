import { useEffect, useState } from "react"
import { AddReviewModal } from "./AddReviewModal/AddReviewModal"
import styles from "./ReviewsPage.module.scss"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { ITestimonialData, ITranslatedTestimonialsData } from "../types/types"
import { defaultLanguage } from "shared/const/languages"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { EditParagraph } from "./EditParagraph/EditParagraph"
import { DeleteParagraph } from "./DeleteParagraph/DeleteParagraph"
import { ModalVideo } from "shared/components/ModalVideo/ModalVideo"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"

export function ReviewsPage() {
    const [data, setData] = useState<ITranslatedTestimonialsData | null>(null)
    const [isDataLoading, setIsDataLoading] = useState(false)

    async function fetch() {
        setIsDataLoading(true)
        const en = (await fetchSectionData("en", "testimonials")) as ITestimonialData[]
        const ro = (await fetchSectionData("ro", "testimonials")) as ITestimonialData[]
        const ru = (await fetchSectionData("ru", "testimonials")) as ITestimonialData[]
        setData({ en, ro, ru })
        setIsDataLoading(false)
    }

    function triggerRefetch() {
        setData(null)
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    if (isDataLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h2>Loading...</h2>
            </div>
        )
    } else {
        return (
            <>
                <AddReviewModal data={data} triggerRefetch={triggerRefetch} />
                <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
                <div className={styles.table}>
                    {data?.[defaultLanguage].map((item, index) => (
                        <div className={styles.item} key={index}>
                            <div>id: {index}</div>
                            <div className={styles.imgContainer}>
                                Preview:
                                <ModalImage className={styles.img} url={item.preview} />
                                Video:
                                <ModalVideo video={item.video} />
                            </div>
                            <div>title: {item.title}</div>
                            <div className={styles.description}>
                                Description: {item.description}
                            </div>
                            <div>Tattoo Artist: {item.artist}</div>
                            <div>Duration: {item.duration}</div>
                            <div className={styles.buttons}>
                                <EditParagraph
                                    data={data}
                                    id={index}
                                    triggerRefetch={triggerRefetch}
                                />
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
}
