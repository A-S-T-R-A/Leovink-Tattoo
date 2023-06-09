import { useState } from "preact/hooks"
import Section from "shared/ui/Section/Section"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { data as d } from "shared/const/data"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"

export default function Portfolio() {
    const data = d.slice(0, 15)
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(d)

    function clickHandler(index: number) {
        const newModalData = [...d.slice(index), ...d.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <Section title="Portfolio">
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} data={modalData} />
            <MasonryGrid data={data} onClick={clickHandler} maxHeight="600px" />
            <ShowMoreLink to="/portfolio" text="show more" className={styles.link} />
        </Section>
    )
}
