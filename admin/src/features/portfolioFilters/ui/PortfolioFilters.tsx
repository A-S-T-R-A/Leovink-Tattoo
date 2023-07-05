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
import { Typography, TypographySize } from "shared/ui/Typography/Typography"

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
        <div className={styles.filterTableContainer}>
            <div className={styles.titleContainer} onClick={onOpen}>
                <span className={styles.arrow}>🡇</span>
                <Typography size={TypographySize.H4} className={styles.title}>
                    Filters
                </Typography>
                <AddNewFilter data={data} triggerRefetch={triggerRefetch} />
            </div>
            {isExpanded && (
                <div className={styles.filtersContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filterTitleContainer}>
                            <Typography size={TypographySize.H5} isBold className={styles.title}>
                                Artists
                            </Typography>
                        </div>
                        {filters?.[0].map(item => (
                            <div className={styles.filterContentContainer}>
                                <Typography size={TypographySize.BASE}>
                                    <strong>Artist:</strong> {item}
                                </Typography>
                                <button
                                    className={styles.filterEditBtn}
                                    onClick={artistEditClickHandler}
                                >
                                    Edit Artist Name
                                </button>
                                <button className={styles.filterDeleteBtn}>Delete Artist</button>
                            </div>
                        ))}
                    </div>

                    {filters?.slice(1).map((item, index) => {
                        return (
                            <div className={styles.filterContainer} key={index}>
                                <div className={styles.filterTitleContainer}>
                                    <Typography
                                        size={TypographySize.H5}
                                        className={styles.title}
                                        isBold
                                    >
                                        {item.title[defaultLanguage]}
                                    </Typography>
                                    <AddNewItem />
                                    <EditFilter />
                                    <DeleteFilter />
                                </div>
                                {item.items.map(innerItem => (
                                    <div className={styles.filterContentContainer}>
                                        <Typography
                                            size={TypographySize.BASE}
                                            className={styles.title}
                                        >
                                            <p>
                                                <strong> {item.title[defaultLanguage]}: </strong>{" "}
                                                {innerItem.label[defaultLanguage]}
                                            </p>
                                        </Typography>

                                        <EditItem />
                                        <DeleteItem />
                                    </div>
                                ))}
                                <div className={styles.infoContainer}>
                                    {/*  <AddNewItem data={data} triggerRefetch={triggerRefetch} /> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
