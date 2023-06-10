import { useState, useEffect } from "preact/hooks"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Dropdown } from "shared/ui/Dropdown"
import type { ITattooImage } from "shared/types/types"
import { FormSection } from "widgets/FormSection/FormSection"
import styles from "./PortfolioPage.module.scss"
import { getDocs, orderBy, query, where } from "firebase/firestore"
import { portfolioPicturesRef } from "shared/const/firebaseVariables"
import { tattooArtistsDropdownOptions, tattooColorsDropdownOptions } from "shared/const/filters"

interface IFilters {
    artist: string
    style: string
    color: string
}
export function PortfolioPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ITattooImage[]>([])
    const [filteredData, setFilteredData] = useState<ITattooImage[]>([])
    const [modalData, setModalData] = useState<ITattooImage[]>([])
    const [filters, setFilters] = useState<IFilters>({ artist: "", style: "", color: "" })

    function filterImages(filters: IFilters): ITattooImage[] {
        const newData = data
            .filter(item => (!filters.artist ? true : item.artist === filters.artist))
            .filter(item => (!filters.style ? true : item.style === filters.style))
            .filter(item => (!filters.color ? true : item.color === filters.color))

        return newData
    }

    useEffect(() => {
        const newData = filterImages(filters)

        setFilteredData(newData)
    }, [filters])

    function clickHandler(index: number) {
        const newModalData = [...filteredData.slice(index), ...filteredData.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    async function fetch() {
        const fetchedData: ITattooImage[] = []
        const q = query(portfolioPicturesRef, (orderBy("id", "asc"), where("isLive", "==", true)))
        const d = await getDocs(q)
        d.forEach(doc => {
            fetchedData.push(doc.data() as ITattooImage)
        })

        setData(fetchedData)
        setModalData(fetchedData)
        setFilteredData(fetchedData)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <PageWrapper title="Portfolio">
            <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className={styles.filters}>
                <Dropdown
                    options={tattooArtistsDropdownOptions}
                    firstOptionText="Select tattoo artist"
                    value={filters.artist}
                    onChange={value => setFilters(prev => ({ ...prev, artist: value }))}
                />
                <Dropdown
                    options={tattooColorsDropdownOptions}
                    firstOptionText="Select tattoo style"
                    value={filters.style}
                    onChange={value => setFilters(prev => ({ ...prev, style: value }))}
                />
                <Dropdown
                    options={tattooColorsDropdownOptions}
                    firstOptionText="Select tattoo color"
                    value={filters.color}
                    onChange={value => setFilters(prev => ({ ...prev, color: value }))}
                />
            </div>
            <MasonryGrid data={filteredData} onClick={clickHandler} />
            <FormSection />
        </PageWrapper>
    )
}
