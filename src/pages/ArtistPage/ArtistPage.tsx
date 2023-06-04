import { useState } from "react"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { data as artistsData } from "widgets/Artists/const/data"
import { data } from "shared/const/data"
import styles from "./ArtistPage.module.scss"
import { Typography, TypographyColor, TypographySize } from "shared/ui/Typography/Typography"
import { Section } from "shared/ui/Section/Section"
import { Form } from "shared/components/Form/Form"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"

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
                        <Typography size={TypographySize.H2} className={styles.name}>
                            {name}
                        </Typography>
                        <Typography
                            color={TypographyColor.COLOR_LIGHTGRAY}
                            className={styles.specialization}
                        >
                            {specialization}
                        </Typography>
                        <Typography color={TypographyColor.COLOR_LIGHTGRAY}>
                            {description}
                        </Typography>
                    </div>
                </div>
                <Form isVertical />
            </Section>
            <Section title="Gallery">
                <MasonryGrid data={galleryData} onClick={clickHandler} />
                <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Section>
        </PageWrapper>
    )
}
