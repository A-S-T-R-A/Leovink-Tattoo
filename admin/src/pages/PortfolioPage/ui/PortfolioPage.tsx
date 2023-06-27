import { useEffect, useState, useMemo } from "react"
import { ViewType } from "../types/types"
import { PortfolioPageHeader } from "./PortfolioPageHeader/PortfolioPageHeader"
import { PortfolioPageFilters } from "./PortfolioPageFilters/PortfolioPageFilters"
import { PortfolioPageList } from "./PortfolioPageList/PortfolioPageList"
import { ITattooImage } from "shared/types/types"
import styles from "./PortfolioPage.module.scss"
import {
    fetchSectionData,
    getImagesDoc,
    reformatAndSortObjectValuesToArray,
} from "shared/const/firebaseVariables"
import { localStorageView } from "../lib/localStorageLib"
import { IFiltersData } from "features/portfolioFilters/types/types"

export function PortfolioPage() {
    const [data, setData] = useState<ITattooImage[]>([])
    const [view, setView] = useState<ViewType>(localStorageView.get() || "icons")
    const [filters, setFilters] = useState<IFiltersData | null>(null)
    const [filtersData, setFiltersData] = useState(null)

    async function fetch() {
        const currentDoc = await getImagesDoc()
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const dataArray = reformatAndSortObjectValuesToArray(currentData)
        setData(dataArray)
        const { filtersData } = await fetchSectionData("en", "other", true)
        setFiltersData(filtersData.filters)
        const f = { isLive: "" }
        Object.keys(filtersData.filters).forEach(item => (f[item] = ""))
        setFilters(f)
    }

    useEffect(() => {
        fetch()
    }, [])

    function filter(data: any, keys: any[] = []) {
        if (!filtersData) return []
        if (keys.length === 0)
            return data.filter(
                item =>
                    filters.isLive === "" ||
                    (item.isLive && filters.isLive === "live") ||
                    (!item.isLive && filters.isLive === "not_live")
            )

        const newData = data.filter(item => {
            return filters[keys[0]] === ""
                ? true
                : filters[keys[0]] === ("Unassigned" as any)
                ? item[keys[0]] === ""
                : item[keys[0]] === (filters[keys[0]] as any)
        })

        return filter(newData, keys.slice(1))
    }

    const filteredData = useMemo(() => {
        const keys = filtersData ? Object.keys(filtersData).filter(item => item !== "reset") : []
        return filter(data, keys)
    }, [data, filters])

    return (
        <div className={styles.wrapper}>
            <PortfolioPageHeader view={view} setView={setView} triggerRefetch={fetch} />
            <PortfolioPageFilters
                filtersData={filtersData}
                filters={filters}
                setFilters={setFilters}
                resetFilters={() => setFilters(filtersData)}
            />
            <PortfolioPageList data={filteredData} view={view} triggerRefetch={fetch} />
        </div>
    )
}
