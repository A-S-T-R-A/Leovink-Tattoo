import { useState } from "preact/hooks"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Section } from "shared/ui/Section/Section"
import { data as artistsData } from "widgets/Artists/const/data"
import { data as dummyGalleryData } from "shared/const/data"
import { Typography } from "shared/ui/Typography/Typography"
import { Form } from "shared/components/Form/Form"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import styles from "./ArtistPage.module.scss"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import type { IArtistsData, IImagesData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"

export function ArtistPage({
    formData,
    formTitle,
    cta,
    data,
    imagesData,
    language,
}: {
    data: IArtistsData
    formData: { name: string; phone: string }
    formTitle: string
    cta: string
    imagesData: IImagesData[]
    language: LanguageType
}) {
    const { name, img, specialization, description } = data
    const galleryData = imagesData
    const [modalData, setModalData] = useState(galleryData)
    const [isOpen, setIsOpen] = useState(false)

    function clickHandler(index: number) {
        const newModalData = [...galleryData.slice(index), ...galleryData.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <>
            <Section containerClassName={styles.container}>
                <div className={styles.card}>
                    <div className={styles.left}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.right}>
                        <Typography tag="h2" size="xxxl" className={styles.name}>
                            {name}
                        </Typography>
                        <Typography tag="p" color="lightgray" className={styles.specialization}>
                            {specialization}
                        </Typography>
                        <Typography tag="p" color="lightgray">
                            {description}
                        </Typography>
                    </div>
                </div>
                <Form isVertical placeholdersData={formData} title={formTitle} cta={cta} />
            </Section>
            <Section title="Gallery">
                <GalleryGrid data={galleryData} onClick={clickHandler} language={language} />
                <ModalGallery
                    data={modalData}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    language={language}
                />
            </Section>
        </>
    )
}
