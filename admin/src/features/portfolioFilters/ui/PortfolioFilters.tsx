import { useNavigate } from "react-router-dom"
import { Confirm } from "shared/ui/CustomNotifications"
import { AddNewFilter } from "./AddNewFilter/AddNewFilter"
import { AddNewItem } from "./AddNewItem/AddNewItem"
import { EditFilter } from "./EditFilter/EditFilter"
import { EditItem } from "./EditItem/EditItem"
import { DeleteFilter } from "./DeleteFilter/DeleteFilter"
import { DeleteItem } from "./DeleteItem/DeleteItem"
import { defaultLanguage } from "shared/const/languages"
import { Typography, TypographySize } from "shared/ui/Typography/Typography"
import { IGlobalData } from "pages/OtherPage"
import styles from "./PortfolioFilters.module.scss"

export function PortfolioFilters({
    data,
    isExpanded,
    onOpen,
    triggerRefetch,
}: {
    data: IGlobalData | null
    isExpanded: boolean
    onOpen: () => void
    triggerRefetch: () => void
}) {
    const navigate = useNavigate()

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
                            <button onClick={artistEditClickHandler} className={styles.editArtist}>
                                Edit Filter
                            </button>
                        </div>
                        {filters?.[0].items.map((item, index) => (
                            <div className={styles.filterContentContainer} key={index}>
                                <Typography size={TypographySize.BASE}>
                                    <strong>Artist:</strong> {item.key}
                                </Typography>
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
                                    <AddNewItem
                                        data={data}
                                        parentId={item.id}
                                        triggerRefetch={triggerRefetch}
                                    />
                                    <EditFilter
                                        data={data}
                                        id={item.id}
                                        triggerRefetch={triggerRefetch}
                                        title={item.title[defaultLanguage]}
                                    />
                                    <DeleteFilter
                                        data={data}
                                        triggerRefetch={triggerRefetch}
                                        id={item.id}
                                        title={item.title[defaultLanguage]}
                                    />
                                </div>
                                {item.items.map((innerItem, index) => (
                                    <div className={styles.filterContentContainer} key={index}>
                                        <Typography
                                            size={TypographySize.BASE}
                                            className={styles.title}
                                        >
                                            <p>
                                                <strong> {item.title[defaultLanguage]}: </strong>
                                                {innerItem.label[defaultLanguage]}
                                            </p>
                                        </Typography>
                                        <EditItem
                                            parentId={item.id}
                                            data={data}
                                            parentTitle={item.title[defaultLanguage]}
                                            filterKey={innerItem.key}
                                            triggerRefetch={triggerRefetch}
                                        />
                                        <DeleteItem
                                            data={data}
                                            triggerRefetch={triggerRefetch}
                                            parentId={item.id}
                                            parentTitle={item.title[defaultLanguage]}
                                            filterKey={innerItem.key}
                                        />
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
