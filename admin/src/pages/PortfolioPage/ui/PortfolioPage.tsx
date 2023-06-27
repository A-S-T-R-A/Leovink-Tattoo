import { useEffect, useState, useMemo } from "react"
import { ITattooImage, ViewType } from "../types/types"
import { PortfolioPageHeader } from "./PortfolioPageHeader/PortfolioPageHeader"
import { PortfolioPageFilters } from "./PortfolioPageFilters/PortfolioPageFilters"
import { PortfolioPageList } from "./PortfolioPageList/PortfolioPageList"
import styles from "./PortfolioPage.module.scss"
import {
    fetchSectionData,
    getImagesDoc,
    reformatAndSortObjectValuesToArray,
} from "shared/const/firebaseVariables"
import { localStorageView } from "../lib/localStorageLib"
import { IFilters, IFiltersData, IOtherData } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"

export function PortfolioPage() {
    const [data, setData] = useState<ITattooImage[]>([])
    const [view, setView] = useState<ViewType>(localStorageView.get() || "icons")
    const [filters, setFilters] = useState<{ [key: string]: string } | null>(null)
    const [filtersData, setFiltersData] = useState<IFilters | null>(null)

    async function fetch() {
        const currentDoc = await getImagesDoc()
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const dataArray = reformatAndSortObjectValuesToArray(currentData)
        setData(dataArray)
        const data = (await fetchSectionData(defaultLanguage, "other", true)) as IOtherData
        if (data) {
            setFiltersData(data.filtersData.filters)
            const f: { [key: string]: string } = { isLive: "" }
            Object.keys(data.filtersData.filters).forEach(item => (f[item] = ""))
            setFilters(f)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    function filter(data: ITattooImage[], keys: string[] = []) {
        if (!filters) return []
        if (keys.length === 0) {
            return data.filter(
                item =>
                    filters.isLive === "" ||
                    (item.filters.isLive && filters.isLive === "live") ||
                    (!item.filters.isLive && filters.isLive === "not_live")
            )
        }

        const newData = data.filter(item => {
            console.log(item)
            return filters[keys[0]] === ""
                ? true
                : filters[keys[0]] === ("Unassigned" as any)
                ? item.filters[keys[0]] === ""
                : item.filters[keys[0]] === (filters[keys[0]] as any)
        })

        return filter(newData, keys.slice(1))
    }

    const keys = filtersData ? Object.keys(filtersData).sort() : []
    const filteredData = useMemo(() => {
        return filter(data, keys)
    }, [data, filters])

    function resetFilters() {
        if (!filtersData) return
        const initialFilters: { [key: string]: string } = { isLive: "" }

        for (const key in filtersData) {
            initialFilters[key] = ""
        }
        setFilters(initialFilters)
    }

    return (
        <div className={styles.wrapper}>
            <PortfolioPageHeader view={view} setView={setView} triggerRefetch={fetch} />
            <PortfolioPageFilters
                filtersData={filtersData}
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
            />
            <PortfolioPageList
                data={data}
                filteredData={filteredData}
                view={view}
                triggerRefetch={fetch}
                filtersData={filtersData}
            />
        </div>
    )
}
