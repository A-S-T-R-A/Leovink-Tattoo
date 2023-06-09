//import { ReactNode } from "react"
import { createPortal } from "preact/compat"

interface PortalProps {
    children: any
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props

    return createPortal(children, element)
}
