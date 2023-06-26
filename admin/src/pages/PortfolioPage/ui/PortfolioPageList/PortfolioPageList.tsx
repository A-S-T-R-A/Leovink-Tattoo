import { useState } from "react"
import { ITattooImage } from "shared/types/types"

import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ViewType } from "../../types/types"

import styles from "./PortfolioPageList.module.scss"
import { EditTattooImage } from "../editTattooImage/EditTattoImage"
import { DeleteTattooImage } from "../deleteTattooImage/DeleteTattooImage"
import { EditBulkTattooImages } from "../editBulkTattooImages/EditBulkTattooImages"
import { DeleteBulkTattooImages } from "../deleteBulkTattooImages/DeleteBulkTattooImages"
import { defaultLanguage } from "shared/const/languages"

export function PortfolioPageList({
    data,
    view,
    triggerRefetch,
}: {
    data: ITattooImage[]
    view: ViewType
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
        if (data.length === selected.length) {
            setSelected([])
        } else {
            setSelected(data.map(item => item.id))
        }
    }

    function unselectAllHandler() {
        setSelected([])
    }

    return view === "icons" ? (
        <div className={styles.icons}>
            {data.map((item, index) => (
                <div className={styles.item} key={index}>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>id: {item.id}</div>
                    <div>artist: {item.artist}</div>
                    <div>style: {item.style}</div>
                    <div>color: {item.color}</div>
                    <div>description: {item.alt[defaultLanguage]}</div>
                    <div>{item.isLive ? "Published" : "Unpublished"}</div>
                    <div className={styles.buttons}>
                        <EditTattooImage
                            id={item.id}
                            triggerRefetch={triggerRefetch}
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
    ) : (
        <>
            <div className={styles.tableButtons}>
                <button onClick={selectAllHandler}>
                    {data.length === selected.length ? "Unselect All" : "Select All"}
                </button>
                {selected.length === 1 && (
                    <>
                        <EditTattooImage
                            id={selected[0]}
                            triggerRefetch={triggerRefetch}
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
                        <EditBulkTattooImages imagesId={selected} triggerRefetch={triggerRefetch} />
                        <DeleteBulkTattooImages
                            imagesId={selected}
                            triggerRefetch={triggerRefetch}
                            unselectAllHandler={unselectAllHandler}
                        />
                    </>
                )}
            </div>
            <div className={styles.table}>
                {data.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <input
                            type="checkbox"
                            checked={selected.includes(item.id)}
                            onChange={() => checkboxChangeHandler(item.id)}
                        />
                        <div>id: {item.id}</div>
                        <ModalImage className={styles.img} url={item.img} />
                        <div>artist: {item.artist}</div>
                        <div>style: {item.style}</div>
                        <div>color: {item.color}</div>
                        <div>description: {item.alt[defaultLanguage]}</div>
                        <div>{item.isLive ? "Published" : "Unpublished"}</div>
                        <div className={styles.buttons}>
                            <EditTattooImage
                                id={item.id}
                                triggerRefetch={triggerRefetch}
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
