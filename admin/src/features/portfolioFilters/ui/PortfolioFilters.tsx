import { useNavigate } from "react-router-dom"
import { fetchSectionData } from "shared/const/firebaseVariables"
import styles from "./PortfolioFilters.module.scss"
import { useEffect, useMemo, useState } from "react"
import { IFilters, IFiltersData } from "../types/types"
import { Confirm } from "shared/ui/CustomNotifications"
import { AddNewFilter } from "./AddNewFilter/AddNewFilter"
import { AddNewItem } from "./AddNewItem/AddNewItem"
import { EditFilter } from "./EditFilter/EditFilter"
import { EditItem } from "./EditItem/EditItem"
import { DeleteFilter } from "./DeleteFilter/DeleteFilter"
import { DeleteItem } from "./DeleteItem/DeleteItem"

export function PortfolioFilters({
    isExpanded,
    onOpen,
}: {
    isExpanded: boolean
    onOpen: () => void
}) {
    const [filtersData, setFiltersData] = useState<IFilters | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetch() {
            const { filtersData } = (await fetchSectionData("en", "other", true)) as any
            setFiltersData(filtersData.filters)
        }
        fetch()
    }, [])

    async function artistEditClickHandler() {
        if (await Confirm("You can edit artists only on Artists Page. Redirect?")) {
            navigate("/artists")
        }
    }

    return (
        <>
            <div className={styles.titleContainer} onClick={onOpen}>
                <div className={styles.title}>filters 🡇</div> <AddNewFilter />
            </div>
            {isExpanded && (
                <div className={styles.listContainer}>
                    <div className={styles.titleContainer}>
                        Artists <button onClick={artistEditClickHandler}>Edit</button>
                    </div>
                    {filtersData?.artist.map(item => (
                        <div className={styles.infoContainer}>
                            <p>artist: {item}</p>
                            <button onClick={artistEditClickHandler}>edit</button>
                        </div>
                    ))}
                    <div className={styles.infoContainer}>
                        <button onClick={artistEditClickHandler}>Add New</button>
                    </div>

                    {filtersData &&
                        Object.entries(filtersData)
                            .filter(([key]) => key !== "artist")
                            .map(([key, value]) => {
                                return (
                                    <>
                                        <div className={styles.titleContainer}>
                                            {key} <EditFilter />
                                            <DeleteFilter />
                                        </div>
                                        {value.map(item => (
                                            <div className={styles.infoContainer}>
                                                <p>
                                                    {key}: {item}
                                                </p>
                                                <EditItem />
                                                <DeleteItem />
                                            </div>
                                        ))}
                                        <div className={styles.infoContainer}>
                                            <AddNewItem />
                                        </div>
                                    </>
                                )
                            })}
                </div>
            )}
        </>
    )
}
