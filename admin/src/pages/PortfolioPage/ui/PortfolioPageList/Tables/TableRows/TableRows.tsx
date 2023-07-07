import { ViewType } from "pages/PortfolioPage/types/types"
import { DeleteIcon, EditIcon } from "shared/assets/icons"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ITattooImage } from "shared/types/types"
import styles from "./TableRow.module.scss"
import { v4 as uuidv4 } from "uuid"

import { useState } from "react"

export function TableIcons({
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
    const uuid = uuidv4()
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableThead}>
                    <tr className={styles.thead}>
                        <th></th>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Style</th>
                        <th>Color</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const { id, img, isLive, artist, style, color } = item

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
                                    {isLive ? (
                                        <p className={styles.statusIcons}>
                                            І
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
                                <td>{artist}</td>
                                <td>{style}</td>
                                <td>{color}</td>
                                <td className={styles.editDelete}>
                                    <div className={styles.editDeleteInternal}>
                                        <button className={styles.editBtn}>
                                            <p>Edit</p>
                                            <EditIcon
                                                className={styles.editIcon}
                                                id={id}
                                                triggerRefetch={triggerRefetch}
                                                unselectAllHandler={unselectAllHandler}
                                            />
                                        </button>
                                        <DeleteIcon
                                            className={styles.deleteIcon}
                                            id={id}
                                            triggerRefetch={triggerRefetch}
                                            unselectAllHandler={unselectAllHandler}
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
