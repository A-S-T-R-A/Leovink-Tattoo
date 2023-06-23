import styles from "./FaqPageList.module.scss"
import { EditQuestion } from "../EditQuestion/EditQuestion"
import { IFaqData } from "pages/FAQPage/types/types"
import { AddQuestion } from "../AddQuestion/AddQuestion"
import { EditFaqTitle } from "../EditFaqTitle/EditFaqTitle"

export function FaqPageList({ faqData }: { faqData: IFaqData[] }) {
    return (
        <div className={styles.table}>
            {faqData.map((data, index) => (
                <>
                    <div className={styles.titleContainer} key={index}>
                        <div className={styles.id}>id: {index + 1}</div>
                        <div className={styles.title}>title: {data.title}</div>
                        <div className={styles.buttons}>
                            <EditFaqTitle faqData={faqData} />
                            <button>delete</button>
                        </div>
                    </div>
                    <div className={styles.questionsContainer}>
                        {data.questions.map((item, index) => {
                            const { question, answer } = item
                            return (
                                <div className={styles.questionContainer}>
                                    <div className={styles.id}>id: {index + 1}</div>
                                    <div className={styles.question}>question: {question}</div>
                                    <div className={styles.answer}>answer: {answer}</div>
                                    <div className={styles.buttons}>
                                        <EditQuestion questionsData={data.questions} />
                                        <button>delete</button>
                                    </div>
                                </div>
                            )
                        })}
                        <AddQuestion className={styles.addBtn} />
                    </div>
                </>
            ))}
        </div>
    )
}
