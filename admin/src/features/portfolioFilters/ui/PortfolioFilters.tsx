import { useNavigate } from "react-router-dom"
import { fetchGlobalData, fetchSectionData } from "shared/const/firebaseVariables"
import styles from "./PortfolioFilters.module.scss"
import { Fragment, useEffect, useMemo, useState } from "react"
import { IFiltersData, IOtherData } from "../types/types"
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
        const d = await fetchGlobalData()
        setData(d)
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
                <div className={styles.title}>filters 🡇</div>
                <AddNewFilter data={data} triggerRefetch={triggerRefetch} />
            </div>
            {isExpanded && (
                <div className={styles.listContainer}>
                    <div className={styles.titleContainer}>
                        Artists <button onClick={artistEditClickHandler}>Edit</button>
                    </div>
                    {filters?.[0].items.map(item => (
                        <div className={styles.infoContainer}>
                            <p>artist: {item.label[defaultLanguage]}</p>
                            <button onClick={artistEditClickHandler}>edit</button>
                        </div>
                    ))}
                    <div className={styles.infoContainer}>
                        <button onClick={artistEditClickHandler}>Add New</button>
                    </div>

                    {filters?.slice(1).map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className={styles.titleContainer}>
                                    {item.title[defaultLanguage]} <EditFilter />
                                    <DeleteFilter />
                                </div>
                                {item.items.map(innerItem => (
                                    <div className={styles.infoContainer}>
                                        <p>
                                            {item.title[defaultLanguage]}:{" "}
                                            {innerItem.label[defaultLanguage]}
                                        </p>
                                        <EditItem />
                                        <DeleteItem />
                                    </div>
                                ))}
                                <div className={styles.infoContainer}>
                                    {/*  <AddNewItem data={data} triggerRefetch={triggerRefetch} /> */}
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </>
    )
}
