import { useState } from "react"
import { data } from "shared/const/data"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"

export function PortfolioPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(data)

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <>
            <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <PageWrapper title="Portfolio">
                <MasonryGrid data={data} onClick={clickHandler} />
            </PageWrapper>
        </>
    )
}
