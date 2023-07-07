import { ReactNode, useEffect, useState } from "react"

const BR = "*br/*"
const B = ["*b*", "*/b*"]

export function DecodeMarkdown({ data }: { data: string }): ReactNode {
    function findBoldWords(d: string) {
        if (d.indexOf(B[0]) === -1) return d
        if (d.indexOf(B[0]) > d.indexOf(B[1])) return d
        if (d.lastIndexOf(B[1]) < d.lastIndexOf(B[0])) return d
        if (d.split(B[0]).length !== d.split(B[1]).length) return d

        const arr = []
        let stack = d

        while (stack.includes(B[0])) {
            const s = stack.indexOf(B[0])
            const f = stack.indexOf(B[1])

            arr.push({
                text: stack.slice(0, s),
                isBold: false,
            })
            arr.push({
                text: stack.slice(s + B[0].length, f),
                isBold: true,
            })
            stack = stack.slice(f + B[1].length)
        }
        arr.push({
            text: stack,
            isBold: false,
        })

        return arr.map(({ text, isBold }) => {
            if (text.includes(BR)) {
                const content = text.split(BR).map((innerItem, innerIndex, innerArray) => {
                    if (innerIndex !== innerArray.length - 1) {
                        return (
                            <>
                                {innerItem}
                                <br />
                            </>
                        )
                    }
                    return innerItem
                })
                return isBold ? <strong>{content}</strong> : content
            } else {
                if (isBold) {
                    return <strong>{text}</strong>
                }
                return text
            }
        })
    }

    const content = findBoldWords(data)

    return <p>{content}</p>
}
