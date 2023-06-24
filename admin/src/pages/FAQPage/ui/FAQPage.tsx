import { Fragment, useEffect, useState } from "react"
import { faqData as dummyData } from "../const/faqData"
import { AddFaqTitle } from "./AddFaqTitle/AddFaqTitle"
import { EditFaqTitle } from "./EditFaqTitle/EditFaqTitle"
import { EditQuestion } from "./EditQuestion/EditQuestion"
import { AddQuestion } from "./AddQuestion/AddQuestion"
import styles from "./FaqPage.module.scss"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { IFaqData, ITranslatedFaqData } from "../types/types"
import { defaultLanguage } from "shared/const/languages"

export function FAQPage() {
    const [data, setData] = useState<ITranslatedFaqData | null>(null)

    async function fetch() {
        const en = (await fetchSectionData("en", "faq")) as IFaqData[]
        const ro = (await fetchSectionData("ro", "faq")) as IFaqData[]
        const ru = (await fetchSectionData("ru", "faq")) as IFaqData[]
        setData({ en, ro, ru })
    }

    function triggerRefetch() {
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <AddFaqTitle faqData={dummyData} />
            <div className={styles.table}>
                {data?.[defaultLanguage].map((data, index) => {
                    return (
                        <Fragment key={index}>
                            <div className={styles.titleContainer}>
                                <div className={styles.id}>id: {index}</div>
                                <div className={styles.title}>title: {data.title}</div>
                                {data.title !== "index" && (
                                    <div className={styles.buttons}>
                                        <EditFaqTitle
                                            data={data}
                                            id={index}
                                            triggerRefetch={triggerRefetch}
                                        />
                                        <button>delete</button>
                                    </div>
                                )}
                            </div>
                            <div className={styles.questionsContainer}>
                                {data.questions.map((item, index) => {
                                    const { question, answer } = item
                                    return (
                                        <div key={index} className={styles.questionContainer}>
                                            <div className={styles.id}>id: {index}</div>
                                            <div className={styles.question}>
                                                question: {question}
                                            </div>
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
        </>
    )
}
