import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Dropdown } from "shared/ui/Dropdown"
import { Modal } from "shared/ui/Modal"
import styles from "./EditModal.module.scss"
import { useMemo } from "react"
import { ITattooImage } from "../../../types/types"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { LanguageType } from "shared/types/types"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Languages } from "shared/components/Languages/Languages"
import { PlusIcon } from "shared/ui/Icons"

interface IEditModalProps {
    length: number
    newData: ITattooImage
    filtersData: IFilter[]
    isOpen: boolean
    isLoading: boolean
    currentLanguage: LanguageType
    onClose: () => void
    setNewData: (data: any) => void
    saveClickHandler: () => void
    discardClickHandler: () => void
    onChangeLanguage: (language: LanguageType) => void
}

export function EditModal(props: IEditModalProps) {
    const {
        currentLanguage,
        length,
        newData,
        filtersData,
        isOpen,
        isLoading,
        onClose,
        setNewData,
        saveClickHandler,
        discardClickHandler,
        onChangeLanguage,
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
                { label: `No ${item.title[defaultLanguage]}`, value: "Unassigned" },
                ...item.items.map(innerItem => ({
                    label: innerItem.label[defaultLanguage],
                    value: innerItem.key,
                })),
            ],
        }))
    }, [filtersData])

    return (
        <Modal isOpen={isOpen || isLoading} onClose={() => null} contentClassName={styles.content}>
            {isLoading ? (
                "Loading..."
            ) : (
                <div className={styles.container}>
                    <div className={styles.cross} onClick={onClose}>
                        <PlusIcon />
                    </div>
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
                    {dropdownOptions.map((item, index) => {
                        return (
                            <div key={item.name + index}>
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
                    <div className={styles.description}>
                        <p>description:</p>
                        <div>
                            <Textarea
                                value={newData.alt[currentLanguage]}
                                onChange={alt =>
                                    setNewData((prev: ITattooImage) => ({
                                        ...prev,
                                        alt: { ...prev.alt, [currentLanguage]: alt },
                                    }))
                                }
                            />
                            <Languages
                                currentLanguage={currentLanguage}
                                onChangeLanguage={onChangeLanguage}
                            />
                        </div>
                    </div>
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
                </div>
            )}
        </Modal>
    )
}
