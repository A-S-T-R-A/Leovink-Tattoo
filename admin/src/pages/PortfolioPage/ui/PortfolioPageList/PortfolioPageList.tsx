import { useState } from "react"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ITattooImage, ViewType } from "../../types/types"
import styles from "./PortfolioPageList.module.scss"
import { EditTattooImage } from "../editTattooImage/EditTattoImage"
import { DeleteTattooImage } from "../deleteTattooImage/DeleteTattooImage"
import { EditBulkTattooImages } from "../editBulkTattooImages/EditBulkTattooImages"
import { DeleteBulkTattooImages } from "../deleteBulkTattooImages/DeleteBulkTattooImages"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { TableIcons } from "./Tables/TableIcons/TableIcons"

export function PortfolioPageList({
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

    const filterKeys = filtersData.map(item => item.title[defaultLanguage])

    return view === "icons" ? (
        <TableIcons
            triggerRefetch={triggerRefetch}
            data={data}
            filtersData={filtersData}
            view="icons"
            filteredData={filteredData}
        />
    ) : (
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        <>
            <div className={styles.tableButtons}>
                <button onClick={selectAllHandler}>
                    {filteredData.length === selected.length ? "Unselect All" : "Select All"}
                </button>
                {selected.length === 1 && (
                    <>
                        <EditTattooImage
                            id={selected[0]}
                            triggerRefetch={triggerRefetch}
                            data={data}
                            filtersData={filtersData}
                            unselectAllHandler={unselectAllHandler}
                        />
                        <DeleteTattooImage
                            id={selected[0]}
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
            <div className={styles.table}>
                {filteredData.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <input
                            type="checkbox"
                            checked={selected.includes(item.id)}
                            onChange={() => checkboxChangeHandler(item.id)}
                        />
                        <div>id: {item.id}</div>
                        <ModalImage className={styles.img} url={item.img} />

                        {filterKeys.map((key, index) => {
                            return (
                                <div key={key + index}>
                                    {key}: {item.filters[key] || ""}
                                </div>
                            )
                        })}
                        <div>{item.filters.isLive ? "Published" : "Unpublished"}</div>
                        <div className={styles.buttons}>
                            <EditTattooImage
                                id={item.id}
                                triggerRefetch={triggerRefetch}
                                data={data}
                                filtersData={filtersData}
                                unselectAllHandler={unselectAllHandler}
                            />
                            <DeleteTattooImage
                                id={item.id}
                                triggerRefetch={triggerRefetch}
                                unselectAllHandler={unselectAllHandler}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
