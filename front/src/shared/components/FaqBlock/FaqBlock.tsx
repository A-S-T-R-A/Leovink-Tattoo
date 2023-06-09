import { useState } from "preact/hooks"
import type { IFaqBlock } from "shared/types/types"
import styles from "./FaqBlock.module.scss"
import { Typography } from "shared/ui/Typography/Typography"
import { PlusIcon } from "shared/ui/Icons"
import { classNames } from "shared/lib/classNames/classNames"

export function FaqBlock({ data, isWithoutTitle }: { data: IFaqBlock; isWithoutTitle?: boolean }) {
    const { title, questions } = data
    const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

    function questionClickHandler(index: number) {
        if (!expandedQuestions?.includes(index)) {
            setExpandedQuestions(prev => [...prev, index])
        }
    }

    function iconClickHandler(e: MouseEvent, index: number) {
        e.stopPropagation()

        if (!expandedQuestions?.includes(index)) {
            setExpandedQuestions(prev => [...prev, index])
        } else {
            setExpandedQuestions(prev => prev.filter(el => el !== index))
        }
    }

    return (
        <div className={styles.container}>
            {!isWithoutTitle && <Typography className={styles.title}>{title}</Typography>}
            <div className={styles.list}>
                {questions.map((item, index) => {
                    const { question, answer } = item
                    const isExpanded = expandedQuestions.includes(index)
                    return (
                        <div key={index} className={styles.listItem}>
                            <div
                                className={styles.question}
                                onClick={() => questionClickHandler(index)}
                            >
                                <Typography className={styles.questionTitle}>{question}</Typography>

                                <div onClick={e => iconClickHandler(e, index)}>
                                    <PlusIcon
                                        className={classNames(styles.icon, {
                                            [styles.rotated]: isExpanded,
                                        })}
                                    />
                                </div>
                            </div>
                            {isExpanded && (
                                <Typography className={styles.answer}>{answer}</Typography>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
