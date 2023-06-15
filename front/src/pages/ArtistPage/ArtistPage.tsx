import { useState } from "preact/hooks"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Section } from "shared/ui/Section/Section"
import { data as artistsData } from "widgets/Artists/const/data"
import { data } from "shared/const/data"
import { Typography } from "shared/ui/Typography/Typography"
import { Form } from "shared/components/Form/Form"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import styles from "./ArtistPage.module.scss"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"

export function ArtistPage() {
    const { name, img, specialization, description } = artistsData[0]
    const galleryData = [...data.slice(2, 6), data[8]]
    const [modalData, setModalData] = useState(galleryData)
    const [isOpen, setIsOpen] = useState(false)

    function clickHandler(index: number) {
        const newModalData = [...galleryData.slice(index), ...galleryData.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    return (
        <PageWrapper title="ARTIST">
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
                <Form isVertical />
            </Section>
            <Section title="Gallery">
                <GalleryGrid data={galleryData} onClick={clickHandler} />
                <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Section>
        </PageWrapper>
    )
}
