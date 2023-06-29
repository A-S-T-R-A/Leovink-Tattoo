import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Dropdown } from "shared/ui/Dropdown"
import { Modal } from "shared/ui/Modal"
import styles from "./EditModal.module.scss"
import { useMemo } from "react"
import { ITattooImage } from "../../../types/types"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"

interface IEditModalProps {
    length: number
    newData: ITattooImage
    filtersData: IFilter[]
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    setNewData: (data: any) => void
    saveClickHandler: () => void
    discardClickHandler: () => void
}

export function EditModal(props: IEditModalProps) {
    const {
        length,
        newData,
        filtersData,
        isOpen,
        isLoading,
        onClose,
        setNewData,
        saveClickHandler,
        discardClickHandler,
    } = props

    const dropdownNumbers = Array(length)
        .fill("")
        .map((_, index) => {
            const v = index.toString()
            return { label: v, value: v }
        })

    const dropdownOptions = useMemo(() => {
        return filtersData.map(item => ({
            name: item.title[defaultLanguage],
            options: [
                ...item.items.map(innerItem => ({
                    label: innerItem.label[defaultLanguage],
                    value: innerItem.key,
                })),
                { label: `No ${item.title[defaultLanguage]}`, value: "Unassigned" },
            ],
        }))
    }, [filtersData])

    return (
        <Modal isOpen={isOpen || isLoading} onClose={onClose} className={styles.container}>
            {isLoading ? (
                "Loading..."
            ) : (
                <>
                    <div>
                        id:
                        <Dropdown
                            options={dropdownNumbers}
                            value={newData.id?.toString()}
                            onChange={id =>
                                setNewData((prev: ITattooImage) => ({ ...prev, id: +id }))
                            }
                        />
                    </div>
                    <div>
                        img:
                        <ModalImage url={newData.img} className={styles.img} />
                    </div>
                    {dropdownOptions.map(item => {
                        return (
                            <div>
                                {item.name}:
                                <Dropdown
                                    options={item.options}
                                    value={newData.filters[item.name] as string}
                                    onChange={value =>
                                        setNewData((prev: ITattooImage) => ({
                                            ...prev,
                                            filters: { ...prev.filters, [item.name]: value },
                                        }))
                                    }
                                />
                            </div>
                        )
                    })}
                    <div>
                        published:
                        <input
                            type="checkbox"
                            checked={newData.filters.isLive}
                            onChange={e =>
                                setNewData((prev: ITattooImage) => ({
                                    ...prev,
                                    filters: { ...prev.filters, isLive: e.target.checked },
                                }))
                            }
                        />
                    </div>
                    <button onClick={saveClickHandler}>Save</button>
                    <button onClick={discardClickHandler}>Discard</button>
                </>
            )}
        </Modal>
    )
}
