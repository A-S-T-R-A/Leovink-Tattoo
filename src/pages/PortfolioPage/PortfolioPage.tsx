import { useState } from "react"
import { ModalGallery } from "widgets/ModalGallery"

export function PortfolioPage() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div>
                page
                <button onClick={() => setIsOpen(prev => !prev)}>toggle</button>
            </div>
        </>
    )
}
