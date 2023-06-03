import { useState } from "react"
import { data } from "shared/const/data"
import { MasonryGrid } from "shared/ui/MasonryGrid/MasonryGrid"
import { ModalGallery } from "widgets/ModalGallery"

export function PortfolioPage() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <MasonryGrid data={data} />
                </div>
                page
                <button onClick={() => setIsOpen(prev => !prev)}>toggle</button>
            </div>
        </>
    )
}
