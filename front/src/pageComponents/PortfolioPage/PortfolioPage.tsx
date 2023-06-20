import { useState, useEffect } from "preact/hooks"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Dropdown } from "shared/ui/Dropdown"
import type { ITattooImage } from "shared/types/types"
import { FormSection } from "widgets/FormSection/FormSection"
import styles from "./PortfolioPage.module.scss"
import { getDocs, orderBy, query, where } from "firebase/firestore"
import { IImagesData, portfolioPicturesRef } from "shared/const/firebaseVariables"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { Section } from "shared/ui/Section/Section"
import { Button } from "shared/ui/Button/Button"
import { AntiClockwiseIcon } from "shared/ui/Icons"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import { data as dummyData } from "shared/const/data"

interface IFilters {
    artist: string
    style: string
    color: string
}

export function PortfolioPage({
    formTitle,
    placeholdersData,
    button,
    filtersData,
    fetchedData,
}: {
    filtersData: {
        artists: string
        styles: string
        colors: string
        reset: string
    }
    formTitle: string
    placeholdersData: { name: string; phone: string }
    button: string
    fetchedData: ITattooImage[]
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [filteredData, setFilteredData] = useState<ITattooImage[]>([])
    const [modalData, setModalData] = useState<ITattooImage[]>([])
    const [filters, setFilters] = useState<IFilters>({ artist: "", style: "", color: "" })

    const data = fetchedData

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

    function resetFiltersHandler() {
        setFilters({ artist: "", style: "", color: "" })
    }

    return (
        <>
            <ModalGallery data={modalData} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <Section>
                <div className={styles.filters}>
                    <Dropdown
                        options={tattooArtistsDropdownOptions}
                        firstOptionText={filtersData.artists}
                        value={filters.artist}
                        onChange={value => setFilters(prev => ({ ...prev, artist: value }))}
                    />
                    <Dropdown
                        options={tattooStylesDropdownOptions}
                        firstOptionText={filtersData.styles}
                        value={filters.style}
                        onChange={value => setFilters(prev => ({ ...prev, style: value }))}
                    />
                    <Dropdown
                        options={tattooColorsDropdownOptions}
                        firstOptionText={filtersData.colors}
                        value={filters.color}
                        onChange={value => setFilters(prev => ({ ...prev, color: value }))}
                    />
                    <Button className={styles.btn} onClick={() => resetFiltersHandler()}>
                        {filtersData.reset} <AntiClockwiseIcon />
                    </Button>
                </div>
                <GalleryGrid data={filteredData} onClick={clickHandler} />
                <FormSection title={formTitle} data={placeholdersData} button={button} />
            </Section>
        </>
    )
}
