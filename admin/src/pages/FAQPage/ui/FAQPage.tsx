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
import { DeleteFaqTitle } from "./DeleteFaqTitle/DeleteFaqTitle"
import { DeleteQuestion } from "./DeleteQuestion/DeleteQuestion"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"

export function FAQPage() {
    const [data, setData] = useState<ITranslatedFaqData | null>(null)

    async function fetch() {
        const en = (await fetchSectionData("en", "faq")) as IFaqData[]
        const ro = (await fetchSectionData("ro", "faq")) as IFaqData[]
        const ru = (await fetchSectionData("ru", "faq")) as IFaqData[]
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
            <AddFaqTitle data={data} triggerRefetch={triggerRefetch} />
            <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
            <div className={styles.table}>
                {data?.[defaultLanguage]?.map((titleItem, titleIndex) => {
                    return (
                        <Fragment key={titleIndex}>
                            <div className={styles.titleContainer}>
                                <div className={styles.id}>id: {titleIndex}</div>
                                <div className={styles.title}>title: {titleItem.title}</div>
                                {titleItem.title !== "index" && (
                                    <div className={styles.buttons}>
                                        <EditFaqTitle
                                            data={data}
                                            id={titleIndex}
                                            triggerRefetch={triggerRefetch}
                                        />
                                        <DeleteFaqTitle
                                            data={data}
                                            id={titleIndex}
                                            triggerRefetch={triggerRefetch}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={styles.questionsContainer}>
                                {titleItem.questions.map((item, index) => {
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
                                                    data={data}
                                                    titleId={titleIndex}
                                                    id={index}
                                                    triggerRefetch={triggerRefetch}
                                                />
                                                <DeleteQuestion
                                                    data={data}
                                                    titleId={titleIndex}
                                                    id={index}
                                                    triggerRefetch={triggerRefetch}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                                <AddQuestion
                                    data={data}
                                    titleId={titleIndex}
                                    triggerRefetch={triggerRefetch}
                                />
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}
