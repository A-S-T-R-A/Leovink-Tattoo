import { Fragment } from "react"
import styles from "./FaqPageList.module.scss"
import { EditQuestion } from "../EditQuestion/EditQuestion"
import { IFaqData } from "../../types/types"
import { AddQuestion } from "../AddQuestion/AddQuestion"
import { EditFaqTitle } from "../EditFaqTitle/EditFaqTitle"

export function FaqPageList({ faqData }: { faqData: IFaqData[] }) {
    return (
        <div className={styles.table}>
            {faqData.map((data, index) => {
                return (
                    <Fragment key={index}>
                        <div className={styles.titleContainer}>
                            <div className={styles.id}>id: {index}</div>
                            <div className={styles.title}>title: {data.title}</div>
                            <div className={styles.buttons}>
                                <EditFaqTitle faq={data} id={index} />
                                <button>delete</button>
                            </div>
                        </div>
                        <div className={styles.questionsContainer}>
                            {data.questions.map((item, index) => {
                                const { question, answer } = item
                                return (
                                    <div key={index + 1} className={styles.questionContainer}>
                                        <div className={styles.id}>id: {index}</div>
                                        <div className={styles.question}>question: {question}</div>
                                        <div className={styles.answer}>answer: {answer}</div>
                                        <div className={styles.buttons}>
                                            <EditQuestion
                                                questionsData={data.questions}
                                                question={item}
                                            />
                                            <button>delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                            <AddQuestion className={styles.addBtn} />
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}
