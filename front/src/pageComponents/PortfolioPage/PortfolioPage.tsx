import { useState, useEffect } from "preact/hooks"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { Dropdown } from "shared/ui/Dropdown"
import { FormSection } from "widgets/FormSection/FormSection"
import styles from "./PortfolioPage.module.scss"
import type { IImagesData } from "shared/const/firebaseVariables"
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
import type { LanguageType } from "shared/types/types"

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
    language,
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
    fetchedData: IImagesData[]
    language: LanguageType
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [filteredData, setFilteredData] = useState<IImagesData[]>([])
    const [modalData, setModalData] = useState<IImagesData[]>([])
    const [filters, setFilters] = useState<IFilters>({ artist: "", style: "", color: "" })

    const data = fetchedData

    function filterImages(filters: IFilters): IImagesData[] {
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
            <ModalGallery
                data={modalData}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                language={language}
            />
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
                <GalleryGrid data={filteredData} onClick={clickHandler} language={language} />
                <div className={styles.marginBottom} />
                <FormSection title={formTitle} data={placeholdersData} button={button} />
            </Section>
        </>
    )
}
