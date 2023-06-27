import { useNavigate } from "react-router-dom"
import { fetchSectionData } from "shared/const/firebaseVariables"
import styles from "./PortfolioFilters.module.scss"
import { Fragment, useEffect, useMemo, useState } from "react"
import { IFilters, IFiltersData, IOtherData } from "../types/types"
import { Confirm } from "shared/ui/CustomNotifications"
import { AddNewFilter } from "./AddNewFilter/AddNewFilter"
import { AddNewItem } from "./AddNewItem/AddNewItem"
import { EditFilter } from "./EditFilter/EditFilter"
import { EditItem } from "./EditItem/EditItem"
import { DeleteFilter } from "./DeleteFilter/DeleteFilter"
import { DeleteItem } from "./DeleteItem/DeleteItem"
import { defaultLanguage } from "shared/const/languages"

export function PortfolioFilters({
    isExpanded,
    onOpen,
}: {
    isExpanded: boolean
    onOpen: () => void
}) {
    const [data, setData] = useState<IOtherData | null>(null)

    const navigate = useNavigate()

    async function fetch() {
        const data = (await fetchSectionData(defaultLanguage, "other", true)) as IOtherData
        setData(data)
    }

    function triggerRefetch() {
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    async function artistEditClickHandler() {
        if (await Confirm("You can edit artists only on Artists Page. Redirect?")) {
            navigate("/artists")
        }
    }

    const filters = data?.filtersData.filters

    return (
        <>
            <div className={styles.titleContainer} onClick={onOpen}>
                <div className={styles.title}>filters 🡇</div>{" "}
                <AddNewFilter data={data} triggerRefetch={triggerRefetch} />
            </div>
            {isExpanded && (
                <div className={styles.listContainer}>
                    <div className={styles.titleContainer}>
                        Artists <button onClick={artistEditClickHandler}>Edit</button>
                    </div>
                    {filters?.artist.map(item => (
                        <div className={styles.infoContainer}>
                            <p>artist: {item.label}</p>
                            <button onClick={artistEditClickHandler}>edit</button>
                        </div>
                    ))}
                    <div className={styles.infoContainer}>
                        <button onClick={artistEditClickHandler}>Add New</button>
                    </div>

                    {filters &&
                        Object.entries(filters)
                            .filter(([key]) => key !== "artist")
                            .map(([key, value], index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className={styles.titleContainer}>
                                            {key} <EditFilter />
                                            <DeleteFilter />
                                        </div>
                                        {value.map(item => (
                                            <div className={styles.infoContainer}>
                                                <p>
                                                    {key}: {item.label}
                                                </p>
                                                <EditItem />
                                                <DeleteItem />
                                            </div>
                                        ))}
                                        <div className={styles.infoContainer}>
                                            <AddNewItem />
                                        </div>
                                    </Fragment>
                                )
                            })}
                </div>
            )}
        </>
    )
}
