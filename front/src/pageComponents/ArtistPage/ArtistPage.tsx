import { useState } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { Typography } from "shared/ui/Typography/Typography"
import { Form } from "shared/components/Form/Form"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import styles from "./ArtistPage.module.scss"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import type { IArtistsData, ITattooImage } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"
import { Image } from "shared/ui/Image/Image"
import { DecodeMarkdown } from "widgets/FindUs/lib/DecodeMarkdown"
import dummyImg from "./const/a1.jpg"

export function ArtistPage({
    formData,
    formTitle,
    cta,
    data,
    imagesData,
    language,
}: {
    data: IArtistsData
    formData: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
        validName: string
        validPhone: string
    } | null
    formTitle: string
    cta: string
    imagesData: ITattooImage[]
    language: LanguageType
}) {
    const { name, img, specialization, fullDescription } = data
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
                        <Image src={dummyImg || img} alt={`${name} tattoo ${specialization}`} />
                    </div>
                    <div className={styles.right}>
                        <Typography tag="h2" size="xxxl" className={styles.name}>
                            {name}
                        </Typography>
                        <Typography tag="p" color="lightgray" className={styles.specialization}>
                            {specialization}
                        </Typography>
                        {fullDescription && <DecodeMarkdown data={fullDescription} />}
                    </div>
                </div>
                {formData && (
                    <Form
                        isVertical
                        data={formData}
                        title={formTitle}
                        cta={cta}
                        className={styles.verticalForm}
                    />
                )}
            </Section>
            {formData && (
                <Form
                    data={formData}
                    title={formTitle}
                    cta={cta}
                    className={styles.horizontalForm}
                />
            )}
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
