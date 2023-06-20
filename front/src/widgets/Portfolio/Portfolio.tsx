import { useState, useEffect } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"
import type { ITattooImage } from "shared/types/types"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
/* import { data as dummyData } from "shared/const/data" */

export function Portfolio({
    title,
    button,
    fetchedData,
}: {
    title: string
    button: string
    fetchedData: ITattooImage[]
}) {
    const [isOpen, setIsOpen] = useState(false)
    /*  const [data, setData] = useState<ITattooImage[]>(() => fetchedData) */
    const [modalData, setModalData] = useState<ITattooImage[]>([])

    const data = fetchedData.slice(0, 12)

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }
    console.log(fetchedData)

    /*  async function fetch() {
       

        const fetchedData = dummyData

        const limitedData = fetchedData.slice(16, 36)

        setData(limitedData)
        setModalData(limitedData)
    }

    useEffect(() => {
        fetch()
    }, []) */

    return (
        <Section title={title}>
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} data={modalData} />
            <GalleryGrid data={data} onClick={clickHandler} maxHeight="600px" />
            <ShowMoreLink to="/portfolio" text={button} className={styles.link} />
        </Section>
    )
}
