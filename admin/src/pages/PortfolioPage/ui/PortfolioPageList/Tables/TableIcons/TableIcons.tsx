import { ViewType } from "pages/PortfolioPage/types/types"
import { useState } from "react"
import { DeleteIcon, EditIcon } from "shared/assets/icons"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ITattooImage } from "pages/PortfolioPage/types/types"
import styles from "./TableIcons.module.scss"
import { v4 as uuidv4 } from "uuid"
import { EditTattooImage } from "pages/PortfolioPage/ui/editTattooImage/EditTattoImage"
import { DeleteTattooImage } from "pages/PortfolioPage/ui/deleteTattooImage/DeleteTattooImage"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"

export function TableIcons({
    data,
    filteredData,
    view,
    filtersData,
    triggerRefetch,
}: {
    data: ITattooImage[]
    filteredData: ITattooImage[]
    view: ViewType
    filtersData: IFilter[]
    triggerRefetch: () => void
}) {
    const [selected, setSelected] = useState<number[]>([])

    function checkboxChangeHandler(id: number) {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(item => item !== id))
        } else {
            setSelected(prev => [...prev, id])
        }
    }
    function selectAllHandler() {
        if (filteredData.length === selected.length) {
            setSelected([])
        } else {
            setSelected(filteredData.map(item => item.id))
        }
    }

    function unselectAllHandler() {
        setSelected([])
    }

    const uuid = uuidv4()
    const filterKeys = filtersData.map(item => item.title[defaultLanguage])

    return (
        <div>
            <table className={styles.wrapper}>
                <tbody className={styles.table}>
                    {filteredData.map((item, index) => {
                        const { id, filters, img } = item
                        return (
                            <tr key={id} className={styles.displayedContent}>
                                <label htmlFor={index + `checkbox` + uuid}>
                                    <td>
                                        {id}
                                        <input
                                            type="checkbox"
                                            className={styles.idCheckbox}
                                            id={index + `checkbox` + uuid}
                                            checked={selected.includes(id)}
                                            onChange={() => checkboxChangeHandler(id)}
                                        />
                                    </td>
                                </label>
                                <td>
                                    <ModalImage className={styles.photo} url={img} />
                                </td>
                                <td className={styles.statusString}>
                                    {filters.isLive ? (
                                        <td className={styles.statusPublished}>
                                            <div className={styles.publishedIcon} />
                                            <td>
                                                <p>Published</p>
                                            </td>
                                        </td>
                                    ) : (
                                        <td className={styles.statusUnpublished}>
                                            <div className={styles.unpublishedIcon} />
                                            <td>
                                                <p>Unpublished</p>
                                            </td>
                                        </td>
                                    )}
                                </td>
                                <td className={styles.tattooCharacteristics}>
                                    {filterKeys.map((key, index) => {
                                        return (
                                            <td key={key + index}>
                                                {key}: {filters[key] || ""}
                                            </td>
                                        )
                                    })}
                                </td>
                                <td>
                                    <EditTattooImage
                                        id={item.id}
                                        triggerRefetch={triggerRefetch}
                                        data={data}
                                        filtersData={filtersData}
                                        unselectAllHandler={unselectAllHandler}
                                    />
                                    <DeleteTattooImage
                                        id={id}
                                        triggerRefetch={triggerRefetch}
                                        unselectAllHandler={unselectAllHandler}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
