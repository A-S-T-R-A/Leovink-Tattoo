import { useEffect, useState, useMemo } from "react"
import { getDocs, orderBy, query } from "firebase/firestore"
import { IFiltersData, ViewType } from "../types/types"
import { PortfolioPageHeader } from "./PortfolioPageHeader/PortfolioPageHeader"
import { PortfolioPageFilters } from "./PortfolioPageFilters/PortfolioPageFilters"
import { PortfolioPageList } from "./PortfolioPageList/PortfolioPageList"
import { ArtistType, ColorType, ITattooImage } from "shared/types/types"
import styles from "./PortfolioPage.module.scss"
import { portfolioPicturesRef } from "shared/const/firebaseVariables"
import { TattooArtists } from "shared/const/filters"

export function PortfolioPage() {
    const [data, setData] = useState<ITattooImage[]>([])
    const [view, setView] = useState<ViewType>("icons")
    const [filters, setFilters] = useState<IFiltersData>({
        artist: "",
        style: "",
        color: "",
        isLive: "",
    })

    async function fetch() {
        const fetchedData: ITattooImage[] = []
        const q = query(portfolioPicturesRef, orderBy("id", "asc"))
        const d = await getDocs(q)
        d.forEach(doc => {
            fetchedData.push(doc.data() as ITattooImage)
        })
        setData(fetchedData)
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

    return (
        <div className={styles.wrapper}>
            <PortfolioPageHeader view={view} setView={setView} triggerRefetch={() => fetch()} />
            <PortfolioPageFilters filters={filters} setFilters={setFilters} />
            <PortfolioPageList data={filteredData} view={view} triggerRefetch={() => fetch()} />
        </div>
    )
}