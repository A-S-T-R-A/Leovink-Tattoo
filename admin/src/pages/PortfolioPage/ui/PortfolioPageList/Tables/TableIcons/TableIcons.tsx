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
import { EditBulkTattooImages } from "pages/PortfolioPage/ui/editBulkTattooImages/EditBulkTattooImages"
import { DeleteBulkTattooImages } from "pages/PortfolioPage/ui/deleteBulkTattooImages/DeleteBulkTattooImages"

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
        <article className={styles.wrapper}>
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
            <div className={styles.container}>
                <section className={styles.table}>
                    {filteredData.map((item, index) => {
                        const { id, filters, img } = item
                        return (
                            <div key={id} className={styles.displayedContent}>
                                <label htmlFor={index + `checkbox` + uuid}>
                                    <div className={styles.checkboxBlock}>
                                        {id}
                                        <input
                                            type="checkbox"
                                            className={styles.idCheckbox}
                                            id={index + `checkbox` + uuid}
                                            checked={selected.includes(id)}
                                            onChange={() => checkboxChangeHandler(id)}
                                        />
                                    </div>
                                </label>
                                <ModalImage className={styles.photo} url={img} />
                                <div className={styles.statusString}>
                                    {filters.isLive ? (
                                        <div className={styles.statusPublished}>
                                            <div className={styles.publishedIcon} />
                                            <p>Published</p>
                                        </div>
                                    ) : (
                                        <div className={styles.statusUnpublished}>
                                            <div className={styles.unpublishedIcon} />
                                            <p>Unpublished</p>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.tattooCharacteristics}>
                                    {filterKeys.map((key, index) => {
                                        return (
                                            <p key={key + index}>
                                                {key}: {filters[key] || ""}
                                            </p>
                                        )
                                    })}
                                </div>
                                <div className={styles.btns}>
                                    <EditTattooImage
                                        id={item.id}
                                        triggerRefetch={triggerRefetch}
                                        data={data}
                                        filtersData={filtersData}
                                        unselectAllHandler={unselectAllHandler}
                                        className={styles.editBtn}
                                    />
                                    <DeleteTattooImage
                                        id={id}
                                        triggerRefetch={triggerRefetch}
                                        unselectAllHandler={unselectAllHandler}
                                        className={styles.deleteBtn}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        </article>
    )
}
