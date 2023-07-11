import { useState, useEffect, useMemo } from "preact/hooks"
import { ModalGallery } from "widgets/ModalGallery/ModalGallery"
import { Dropdown } from "shared/ui/Dropdown"
import { FormSection } from "widgets/FormSection/FormSection"
import styles from "./PortfolioPage.module.scss"
import { Section } from "shared/ui/Section/Section"
import { Button } from "shared/ui/Button/Button"
import { AntiClockwiseIcon } from "shared/ui/Icons"
import { GalleryGrid } from "shared/components/GalleryGrid/GalleryGrid"
import type { LanguageType } from "shared/types/types"
import type { IFilter, IFiltersData } from "shared/types/IGlobalData"
import type { ITattooImage } from "shared/const/firebaseVariables"

export function PortfolioPage({
    formTitle,
    formData,
    button,
    globalFiltersData,
    fetchedData,
    filtersButton,
    language,
}: {
    globalFiltersData: IFiltersData | null
    formTitle: string
    formData: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
        validName: string
        validPhone: string
    } | null
    button: string
    fetchedData: ITattooImage[] | []
    language: LanguageType
    filtersButton: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState<ITattooImage[]>([])
    const f: { [key: string]: string } = {}
    globalFiltersData &&
        globalFiltersData.filters.forEach((item: any) => (f[item.title[language]] = ""))
    const [filters, setFilters] = useState<{ [key: string]: string }>(f)
    const [filtersData, setFiltersData] = useState<IFilter[]>(
        () => globalFiltersData?.filters || []
    )
    const keys = filtersData.map(item => item.title.en)
    const data = filter(fetchedData, keys)
    const [filteredData, setFilteredData] = useState<ITattooImage[]>(data)

    useEffect(() => {
        const keys = filtersData.map(item => item.title.en)
        const data = filter(fetchedData, keys)
        setFilteredData(data)
    }, [filters, fetchedData])

    function filter(data: ITattooImage[], keys: string[] = []) {
        if (!filters) return []
        if (keys.length === 0) return data

        const newData = data.filter(item => {
            return filters[keys[0]] === ""
                ? true
                : filters[keys[0]] === ("Unassigned" as any)
                ? item.filters[keys[0]] === ""
                : item.filters[keys[0]] === (filters[keys[0]] as any)
        })

        return filter(newData, keys.slice(1))
    }

    function resetFiltersHandler() {
        if (!filtersData) return
        const initialFilters: { [key: string]: string } = {}
        filtersData.forEach(item => (initialFilters[item.title[language]] = ""))
        setFilters(initialFilters)
    }

    function clickHandler(index: number) {
        const newModalData = [...filteredData.slice(index), ...filteredData.slice(0, index)]
        setIsOpen(true)
        setModalData(newModalData)
    }

    const dropdownOptions = useMemo(() => {
        return globalFiltersData?.filters.map(item => ({
            name: item.title[language],
            options: item.items.map(innerItem => ({
                label: innerItem.label[language],
                value: innerItem.key,
            })),
        }))
    }, [globalFiltersData])

    const all = language === "en" ? "All" : language === "ru" ? "Все" : "Toate"

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
                    {dropdownOptions?.map((item, index) => {
                        const { name, options } = item

                        return (
                            <Dropdown
                                key={index}
                                options={options}
                                firstOptionText={`${all} ${name}`}
                                value={filters?.[name] || ("" as string)}
                                onChange={value =>
                                    setFilters((prev: any) => ({ ...prev, [name]: value }))
                                }
                            />
                        )
                    })}
                    {globalFiltersData && (
                        <Button className={styles.btn} onClick={resetFiltersHandler}>
                            {filtersButton}
                            <AntiClockwiseIcon />
                        </Button>
                    )}
                </div>
                <GalleryGrid data={filteredData} onClick={clickHandler} language={language} />
                <div className={styles.marginBottom} />
                <FormSection title={formTitle} data={formData} button={button} />
            </Section>
        </>
    )
}
