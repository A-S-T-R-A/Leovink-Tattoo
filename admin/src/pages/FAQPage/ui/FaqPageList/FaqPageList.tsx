import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./FaqPageList.module.scss"
import { EditParagraph } from "../EditParagraph/EditParagraph"
import { IFaqData } from "pages/FAQPage/types/types"

export function FaqPageList({ faqData }: { faqData: IFaqData[] }) {
    return (
        <div className={styles.table}>
            {faqData.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {index + 1}</div>
                    {/* <div className={styles.imgContainer}>
                        {item.img.map(img => {
                            return <ModalImage className={styles.img} url={img} />
                        })}
                    </div> */}
                    <div>title: {item.title}</div>
                    <div className={styles.question}>question: {item.title}</div>
                    <div className={styles.answer}>answer: {item.title}</div>

                    <div className={styles.buttons}>
                        <EditParagraph faqData={faqData} />
                        <button>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
