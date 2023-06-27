import { useEffect, useState, useMemo } from "react"
import { IFiltersData, ViewType } from "../types/types"
import { PortfolioPageHeader } from "./PortfolioPageHeader/PortfolioPageHeader"
import { PortfolioPageFilters } from "./PortfolioPageFilters/PortfolioPageFilters"
import { PortfolioPageList } from "./PortfolioPageList/PortfolioPageList"
import { ITattooImage } from "shared/types/types"
import styles from "./PortfolioPage.module.scss"
import { getImagesDoc, reformatAndSortObjectValuesToArray } from "shared/const/firebaseVariables"
import { localStorageView } from "../lib/localStorageLib"

export function PortfolioPage() {
    const [data, setData] = useState<ITattooImage[]>([])
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [view, setView] = useState<ViewType>(localStorageView.get() || "icons")
    const [filters, setFilters] = useState<IFiltersData>({
        artist: "",
        style: "",
        color: "",
        isLive: "",
    })

    async function fetch() {
        setIsDataLoading(true)
        const currentDoc = await getImagesDoc()
        setIsDataLoading(false)
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const dataArray = reformatAndSortObjectValuesToArray(currentData)
        setData(dataArray)
    }

    function triggerRefetch() {
        setData([])
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    const filteredData = useMemo(() => {
        return data
            .filter(item =>
                filters.artist === ""
                    ? true
                    : filters.artist === ("Unassigned" as any)
                    ? item.artist === ""
                    : item.artist === (filters.artist as any)
            )
            .filter(item =>
                filters.style === ""
                    ? true
                    : filters.style === ("Unassigned" as any)
                    ? item.style === ""
                    : item.style === (filters.style as any)
            )
            .filter(item =>
                filters.color === ""
                    ? true
                    : filters.color === ("Unassigned" as any)
                    ? item.color === ""
                    : item.color === (filters.color as any)
            )
            .filter(
                item =>
                    filters.isLive === "" ||
                    (item.isLive && filters.isLive === "live") ||
                    (!item.isLive && filters.isLive === "not_live")
            )
    }, [filters, data])

    if (isDataLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h2>Loading...</h2>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <PortfolioPageHeader
                    view={view}
                    setView={setView}
                    triggerRefetch={triggerRefetch}
                />
                <PortfolioPageFilters filters={filters} setFilters={setFilters} />
                <PortfolioPageList
                    data={filteredData}
                    view={view}
                    triggerRefetch={triggerRefetch}
                />
            </div>
        )
    }
}
