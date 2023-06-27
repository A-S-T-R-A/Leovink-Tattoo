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
import { Typography, TypographySize } from "shared/ui/Typography/Typography"

export function PortfolioFilters({
    isExpanded,
    onOpen,
}: {
    isExpanded: boolean
    onOpen: () => void
}) {
    const navigate = useNavigate()

    const filterdata = {
        artist: ["Dinu", "Katia", "Nastia"],
        color: ["Black"],
        pussies: ["Felicia", "Bob"],
        style: ["Realism"],
    }
    const [filtersData, setFiltersData] = useState<IFilters | null>(filterdata)

    /*    useEffect(() => {
        async function fetch() {
            const { filtersData } = (await fetchSectionData("en", "other", true)) as any
            setFiltersData(filtersData.filters)
        }
        fetch()
    }, []) */

    async function artistEditClickHandler() {
        if (await Confirm("You can edit artists only on Artists Page. Redirect?")) {
            navigate("/artists")
        }
    }

    return (
        <div className={styles.filterTableContainer}>
            <div className={styles.titleContainer} onClick={onOpen}>
                <span className={styles.arrow}>🡇</span>
                <Typography size={TypographySize.H4} className={styles.title}>
                    Filters
                </Typography>
                <AddNewFilter className={styles.titleAddBtn} />
            </div>
            {isExpanded && (
                <div className={styles.filtersContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filterTitleContainer}>
                            <Typography size={TypographySize.H5} isBold className={styles.title}>
                                Artists
                            </Typography>
                            <button
                                className={styles.addNewFilterBtn}
                                onClick={artistEditClickHandler}
                            >
                                + Add New Artist
                            </button>
                            <button
                                className={styles.titleEditBtn}
                                onClick={artistEditClickHandler}
                            >
                                Edit Filter
                            </button>
                            <button
                                className={styles.titleDeletBtn}
                                onClick={artistEditClickHandler}
                            >
                                Delete Filter
                            </button>
                        </div>
                        {filterdata?.artist.map(item => (
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

                    {filtersData &&
                        Object.entries(filtersData)
                            .filter(([key]) => key !== "artist")
                            .map(([key, value]) => {
                                return (
                                    <div className={styles.filterContainer}>
                                        <div className={styles.filterTitleContainer}>
                                            <Typography
                                                size={TypographySize.H5}
                                                className={styles.title}
                                                isBold
                                            >
                                                {key}
                                            </Typography>
                                            <AddNewItem className={styles.addNewFilterBtn} />
                                            <EditFilter className={styles.titleEditBtn} />
                                            <DeleteFilter className={styles.titleDeletBtn} />
                                        </div>
                                        {value.map(item => (
                                            <div className={styles.filterContentContainer}>
                                                <Typography
                                                    size={TypographySize.BASE}
                                                    className={styles.title}
                                                >
                                                    <strong>{key}:</strong> {item}
                                                </Typography>
                                                <EditFilter className={styles.filterEditBtn} />
                                                <DeleteFilter className={styles.filterDeleteBtn} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            })}
                </div>
            )}
        </div>
    )
}
