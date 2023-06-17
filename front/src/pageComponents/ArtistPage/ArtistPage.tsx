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
import type { IArtistsData } from "shared/const/firebaseVariables"

export function ArtistPage({
    formData,
    formTitle,
    cta,
    data,
}: {
    data: IArtistsData
    formData: { name: string; phone: string }
    formTitle: string
    cta: string
}) {
    const { name, img, specialization, description } = data
    const galleryData = [...dummyGalleryData.slice(2, 6), dummyGalleryData[8]]
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
                        <Typography variant="h2" component="xxxl" className={styles.name}>
                            {name}
                        </Typography>
                        <Typography className={styles.specialization}>{specialization}</Typography>
                        <Typography>{description}</Typography>
                    </div>
                </div>
                <Form isVertical placeholdersData={formData} title={formTitle} cta={cta} />
            </Section>
            <Section title="Gallery">
                <GalleryGrid data={galleryData} onClick={clickHandler} />
                <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Section>
        </>
    )
}
