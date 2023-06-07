import { useState, useEffect } from "react"
import { data as d } from "shared/const/data"
import { MasonryGrid } from "shared/components/MasonryGrid/MasonryGrid"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Dropdown } from "shared/ui/Dropdown"
import styles from "./PortfolioPage.module.scss"
import { ITattooImage } from "shared/types/types"
import { FormSection } from "widgets/FormSection/FormSection"

interface IFilters {
    artist: string
    style: string
    color: string
}
export function PortfolioPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(d)
    const [modalData, setModalData] = useState(d)
    const [filters, setFilters] = useState<IFilters>({ artist: "", style: "", color: "" })

    function clickHandler(index: number) {
        const newModalData = [...data.slice(index), ...data.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    function filterImages(filters: IFilters): ITattooImage[] {
        const newData = d
            .filter(item => (!filters.artist ? true : item.artist === filters.artist))
            .filter(item => (!filters.style ? true : item.style === filters.style))
            .filter(item => (!filters.color ? true : item.color === filters.color))

        return newData
    }

    useEffect(() => {
        const newData = filterImages(filters)

        setData(newData)
    }, [filters])

    console.log(data)

    const optionsArtist = [
        { label: "John", value: "John" },
        { label: "Sam", value: "Sam" },
        { label: "Alex", value: "Alex" },
    ]

    const optionsStyle = [
        { label: "Realism", value: "Realism" },
        { label: "Classic", value: "Classic" },
        { label: "NewSchool", value: "NewSchool" },
    ]

    const optionsColor = [
        { label: "Black", value: "Black" },
        { label: "Color", value: "Color" },
    ]

    return (
        <>
            <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <PageWrapper title="Portfolio">
                <div className={styles.filters}>
                    <Dropdown
                        options={optionsArtist}
                        firstOptionText="Select tattoo artist"
                        value={filters.artist}
                        onChange={value => setFilters(prev => ({ ...prev, artist: value }))}
                    />
                    <Dropdown
                        options={optionsStyle}
                        firstOptionText="Select tattoo style"
                        value={filters.style}
                        onChange={value => setFilters(prev => ({ ...prev, style: value }))}
                    />
                    <Dropdown
                        options={optionsColor}
                        firstOptionText="Select tattoo color"
                        value={filters.color}
                        onChange={value => setFilters(prev => ({ ...prev, color: value }))}
                    />
                </div>
                <MasonryGrid data={data} onClick={clickHandler} />
                <FormSection />
            </PageWrapper>
        </>
    )
}
