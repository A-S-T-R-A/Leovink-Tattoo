import type { VNode } from "preact"
import { createPortal } from "preact/compat"

interface PortalProps {
    children: VNode
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props

    return createPortal(children, element)
}
