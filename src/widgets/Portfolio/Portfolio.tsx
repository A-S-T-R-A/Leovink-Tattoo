import { useState } from "react"
import { Section } from "shared/ui/Section/Section"
import { MasonryGrid } from "shared/ui/MasonryGrid/MasonryGrid"
import { data as d } from "shared/const/data"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"

export function Portfolio() {
    const data = d.slice(0, 15)
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(data)

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <Section title="Portfolio">
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} data={modalData} />
            <MasonryGrid data={data} onClick={clickHandler} />
        </Section>
    )
}
