import { useState } from "react"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ITattooImage, ViewType } from "../../../../types/types"
import styles from "./TableRows.module.scss"
import { EditTattooImage } from "../../../editTattooImage/EditTattoImage"
import { DeleteTattooImage } from "../../../deleteTattooImage/DeleteTattooImage"
import { EditBulkTattooImages } from "../../../editBulkTattooImages/EditBulkTattooImages"
import { DeleteBulkTattooImages } from "../../../deleteBulkTattooImages/DeleteBulkTattooImages"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { DeleteIcon, EditIcon } from "shared/assets/icons"
import { v4 as uuidv4 } from "uuid"

export function TableRows({
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
        <>
            <div className={styles.tableButtons}>
                <button onClick={selectAllHandler} className={styles.selectBtn}>
                    {filteredData.length === selected.length ? "Unselect All" : "Select All"}
                </button>
                {selected.length === 1 && (
                    <>
                        <EditBulkTattooImages
                            imagesId={selected}
                            triggerRefetch={triggerRefetch}
                            filtersData={filtersData}
                        />
                        <DeleteBulkTattooImages
                            imagesId={selected}
                            triggerRefetch={triggerRefetch}
                            unselectAllHandler={unselectAllHandler}
                        />
                    </>
                )}
                {selected.length > 1 && (
                    <>
                        <EditBulkTattooImages
                            imagesId={selected}
                            triggerRefetch={triggerRefetch}
                            filtersData={filtersData}
                        />
                        <DeleteBulkTattooImages
                            imagesId={selected}
                            triggerRefetch={triggerRefetch}
                            unselectAllHandler={unselectAllHandler}
                        />
                    </>
                )}
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableThead}>
                        <tr className={styles.thead}>
                            <th></th>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Style</th>
                            <th>Place</th>
                            <th>Color</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => {
                            const { id, img, filters } = item

                            return (
                                <tr key={id} className={styles.displayedContent}>
                                    <td className={styles.idBlock}>
                                        <input
                                            type="checkbox"
                                            className={styles.idCheckbox}
                                            id={`${index}checkbox${uuid}`}
                                            checked={selected.includes(item.id)}
                                            onChange={() => checkboxChangeHandler(item.id)}
                                        />
                                    </td>
                                    <td>{id}</td>
                                    <td>
                                        <ModalImage className={styles.photo} url={img} />
                                    </td>
                                    <td className={styles.status}>
                                        {filters.isLive ? (
                                            <p className={styles.statusIcons}>
                                                <div className={styles.statusGreen} />
                                                Published
                                            </p>
                                        ) : (
                                            <p className={styles.statusIcons}>
                                                <div className={styles.statusRed} />
                                                Unpublished
                                            </p>
                                        )}
                                    </td>

                                    {filterKeys.map((key, index) => {
                                        return (
                                            <td key={key + index}>
                                                {key}: {item.filters[key] || ""}
                                            </td>
                                        )
                                    })}
                                    <td className={styles.editDelete}>
                                        <div className={styles.editDeleteInternal}>
                                            <div className={styles.editTattooBlock}>
                                                <EditTattooImage
                                                    id={item.id}
                                                    triggerRefetch={triggerRefetch}
                                                    data={data}
                                                    filtersData={filtersData}
                                                    unselectAllHandler={unselectAllHandler}
                                                    className={styles.editBtn}
                                                />
                                            </div>
                                            <DeleteTattooImage
                                                id={id}
                                                triggerRefetch={triggerRefetch}
                                                unselectAllHandler={unselectAllHandler}
                                                className={styles.deleteBtn}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
