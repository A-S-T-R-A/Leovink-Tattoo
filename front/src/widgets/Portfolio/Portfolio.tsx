import { useState, useEffect } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"
import { portfolioPicturesRef } from "shared/const/firebaseVariables"
import { getDocs, limit, orderBy, query, where } from "firebase/firestore"
import type { ITattooImage } from "shared/types/types"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import { data as dummyData } from "shared/const/data"

export function Portfolio({ title, button }: { title: string; button: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ITattooImage[]>([])
    const [modalData, setModalData] = useState<ITattooImage[]>([])

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    async function fetch() {
        /* const fetchedData: ITattooImage[] = []
        const q = query(portfolioPicturesRef, (where("isLive", "==", true), orderBy("id", "asc")))
        const d = await getDocs(q)

        d.forEach(doc => {
            fetchedData.push(doc.data() as ITattooImage)
        }) */

        const fetchedData = dummyData

        const limitedData = fetchedData.slice(16, 36)

        setData(limitedData)
        setModalData(limitedData)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Section title={title}>
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} data={modalData} />
            <GalleryGrid data={data} onClick={clickHandler} maxHeight="600px" />
            <ShowMoreLink to="/portfolio" text={button} className={styles.link} />
        </Section>
    )
}
