import { useState } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"
import type { LanguageType } from "shared/types/types"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import type { ITattooImage } from "shared/const/firebaseVariables"

export function Portfolio({
    title,
    button,
    fetchedData,
    language,
    defaultLanguage,
}: {
    title: string
    button: string
    fetchedData: ITattooImage[]
    language: LanguageType
    defaultLanguage: LanguageType
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState<ITattooImage[]>([])

    const data = fetchedData.slice(0, 12)

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }
    const link = language === defaultLanguage ? "/portfolio" : `/${language}/portfolio`
    return (
        <Section title={title} wrapperClassName={styles.wrapper}>
            <ModalGallery
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                data={modalData}
                language={language}
            />
            <GalleryGrid data={data} onClick={clickHandler} maxHeight="600px" language={language} />
            <ShowMoreLink to={link} text={button} className={styles.link} />
        </Section>
    )
}
