import { useEffect, useState, useMemo } from "react"
import { ITattooImage, ViewType } from "../types/types"
import { PortfolioPageHeader } from "./PortfolioPageHeader/PortfolioPageHeader"
import { PortfolioPageFilters } from "./PortfolioPageFilters/PortfolioPageFilters"
import { PortfolioPageList } from "./PortfolioPageList/PortfolioPageList"
import styles from "./PortfolioPage.module.scss"
import {
    fetchGlobalData,
    getImagesDoc,
    reformatAndSortObjectValuesToArray,
} from "shared/const/firebaseVariables"
import { localStorageView } from "../lib/localStorageLib"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { IGlobalData } from "pages/OtherPage"

export function PortfolioPage() {
    const [data, setData] = useState<ITattooImage[]>([])
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [view, setView] = useState<ViewType>(localStorageView.get() || "icons")
    const [filters, setFilters] = useState<{ [key: string]: string } | null>(null)
    const [filtersData, setFiltersData] = useState<IFilter[]>([])

    async function fetch() {
        setIsDataLoading(true)
        const currentDoc = await getImagesDoc()
        setIsDataLoading(false)
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const dataArray = reformatAndSortObjectValuesToArray(currentData)
        setData(dataArray)

        const d = (await fetchGlobalData()) as IGlobalData

        setFiltersData(d.filtersData.filters)
        const f: { [key: string]: string } = { isLive: "" }
        d.filtersData.filters.forEach((item: any) => (f[item.title[defaultLanguage]] = ""))
        setFilters(f)
    }

    function triggerRefetch() {
        setData([])
        fetch()
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
            return filters[keys[0]] === ""
                ? true
                : filters[keys[0]] === ("Unassigned" as any)
                ? item.filters[keys[0]] === ""
                : item.filters[keys[0]] === (filters[keys[0]] as any)
        })

        return filter(newData, keys.slice(1))
    }

    const keys = filtersData.map(item => item.title[defaultLanguage])
    const filteredData = useMemo(() => {
        return filter(data, keys)
    }, [data, filters])

    function resetFilters() {
        if (!filtersData) return
        const initialFilters: { [key: string]: string } = { isLive: "" }

        filtersData.forEach(item => (initialFilters[item.title[defaultLanguage]] = ""))
        setFilters(initialFilters)
    }

    if (isDataLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <PortfolioPageHeader view={view} setView={setView} triggerRefetch={triggerRefetch} />
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
                triggerRefetch={triggerRefetch}
                filtersData={filtersData}
            />
        </div>
    )
}
