/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react"
import styles from "./MarkdownTextarea.module.scss"
import { symbols } from "./const/const"
import { classNames } from "shared/lib/classNames/classNames"
import { Alert } from "../CustomNotifications"

export function MarkdownTextarea({
    onSaveData,
    initialData = "",
}: {
    onSaveData: (val: string) => void
    initialData?: string
}) {
    const [data, setData] = useState("")
    const [displayedData, setDisplayedData] = useState("")
    const [isShowMarkdown, setIsShowMarkdown] = useState(true)
    const [isBActive, setIsBActive] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        setData(initialData)
    }, [])

    useEffect(() => {
        if (isShowMarkdown) {
            setDisplayedData(data)
        } else {
            setDisplayedData(clearSymbols(data))
        }
    }, [isShowMarkdown, data])

    function cursorPositionHandler() {
        if (!textareaRef.current) return
        setCursorPosition(textareaRef.current.selectionStart)
    }

    function clearSymbols(data: string): string {
        let d = data
        for (const k in symbols) {
            const key = k as keyof typeof symbols
            /* @ts-ignore */
            if (symbols[key].length === undefined) {
                const { symbol, display } = symbols[key] as any
                d = d.split(symbol as string).join(display)
            }
            /* @ts-ignore */
            if (symbols[key].length) {
                const arr = symbols[key] as []
                arr.forEach(item => {
                    /* @ts-ignore */
                    d = d.split(item.symbol).join(item.display)
                })
            }
        }
        return d
    }

    function brClickHandler() {
        if (!textareaRef.current) return
        setData(
            prev => prev.slice(0, cursorPosition) + symbols.br.symbol + prev.slice(cursorPosition)
        )
        textareaRef.current.focus()
    }

    function bClickHandler() {
        if (!textareaRef.current) return
        if (!isBActive) {
            setIsBActive(true)
            setData(
                prev =>
                    prev.slice(0, cursorPosition) + symbols.b[0].symbol + prev.slice(cursorPosition)
            )
        } else {
            setIsBActive(false)
            setData(
                prev =>
                    prev.slice(0, cursorPosition) + symbols.b[1].symbol + prev.slice(cursorPosition)
            )
        }
        textareaRef.current.focus()
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div onClick={brClickHandler}>br</div>
                <div
                    onClick={bClickHandler}
                    className={classNames("", { [styles.active]: isBActive })}
                >
                    B
                </div>
                <input
                    type="checkbox"
                    checked={isShowMarkdown}
                    onChange={() => setIsShowMarkdown(prev => !prev)}
                />
                <label>show markdown</label>
            </div>
            <textarea
                ref={textareaRef}
                value={displayedData}
                onChange={e => {
                    setData(e.target.value)
                    setCursorPosition(e.target.value.length)
                }}
                onClick={cursorPositionHandler}
                className={styles.textarea}
            ></textarea>
            <button
                onClick={() => {
                    if (isBActive) {
                        Alert.error(`You have to close the "B" tag`)
                        return
                    }
                    onSaveData(data)
                }}
            >
                Save changes
            </button>
        </div>
    )
}
