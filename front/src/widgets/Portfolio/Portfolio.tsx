import { useState, useEffect } from "preact/hooks"
import { Section } from "shared/ui/Section/Section"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { data as d } from "shared/const/data"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { ShowMoreLink } from "shared/components/ShowMoreLink/ShowMoreLink"
import styles from "./Portfolio.module.scss"
import { portfolioPicturesRef } from "shared/const/firebaseVariables"
import { getDocs, limit, orderBy, query, where } from "firebase/firestore"
import type { ITattooImage } from "shared/types/types"

export function Portfolio() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ITattooImage[]>([])
    const [modalData, setModalData] = useState<ITattooImage[]>([])

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    async function fetch() {
        const fetchedData: ITattooImage[] = []
        const q = query(
            portfolioPicturesRef,
            (limit(15), orderBy("id", "asc"), where("isLive", "==", true))
        )
        const d = await getDocs(q)
        d.forEach(doc => {
            fetchedData.push(doc.data() as ITattooImage)
        })

        setData(fetchedData)
        setModalData(fetchedData)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Section title="Portfolio">
            <ModalGallery isOpen={isOpen} onClose={() => setIsOpen(false)} data={modalData} />
            <MasonryGrid data={data} onClick={clickHandler} maxHeight="600px" />
            <ShowMoreLink to="/portfolio" text="show more" className={styles.link} />
        </Section>
    )
}
