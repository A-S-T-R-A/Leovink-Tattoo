import { useState, useEffect } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"
import type { LanguageType } from "shared/types/types"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import type { IImagesData } from "shared/const/firebaseVariables"
/* import { data as dummyData } from "shared/const/data" */

export function Portfolio({
    title,
    button,
    fetchedData,
    language,
}: {
    title: string
    button: string
    fetchedData: IImagesData[]
    language: LanguageType
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState<IImagesData[]>([])

    const data = fetchedData.slice(0, 12)

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <Section title={title}>
            <ModalGallery
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                data={modalData}
                language={language}
            />
            <GalleryGrid data={data} onClick={clickHandler} maxHeight="600px" language={language} />
            <ShowMoreLink to="/portfolio" text={button} className={styles.link} />
        </Section>
    )
}
