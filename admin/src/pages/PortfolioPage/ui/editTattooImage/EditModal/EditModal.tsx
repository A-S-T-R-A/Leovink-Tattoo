import { ModalImage } from "shared/components/ModalImage/ModalImage"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { ITattooImage } from "shared/types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { Modal } from "shared/ui/Modal"
import styles from "./EditModal.module.scss"

interface IEditModalProps {
    length: number
    data: ITattooImage
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    setData: (data: any) => void
    saveClickHandler: () => void
    discardClickHandler: () => void
}

export function EditModal(props: IEditModalProps) {
    const {
        length,
        data,
        isOpen,
        isLoading,
        onClose,
        setData,
        saveClickHandler,
        discardClickHandler,
    } = props

    const dropdownNumbers = Array(length)
        .fill("")
        .map((_, index) => {
            const v = index.toString()
            return { label: v, value: v }
        })

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
                            value={data.id?.toString()}
                            onChange={id => setData((prev: ITattooImage) => ({ ...prev, id: +id }))}
                        />
                    </div>
                    <div>
                        img:
                        <ModalImage url={data.img} className={styles.img} />
                    </div>
                    <div>
                        artist:
                        <Dropdown
                            options={tattooArtistsDropdownOptions}
                            value={data.artist}
                            onChange={artist =>
                                setData((prev: ITattooImage) => ({ ...prev, artist }))
                            }
                        />
                    </div>
                    <div>
                        style:{" "}
                        <Dropdown
                            options={tattooStylesDropdownOptions}
                            value={data.style}
                            onChange={style =>
                                setData((prev: ITattooImage) => ({ ...prev, style }))
                            }
                        />
                    </div>
                    <div>
                        color:{" "}
                        <Dropdown
                            options={tattooColorsDropdownOptions}
                            value={data.color}
                            onChange={color =>
                                setData((prev: ITattooImage) => ({ ...prev, color }))
                            }
                        />
                    </div>
                    <div>
                        published:
                        <input
                            type="checkbox"
                            checked={data.isLive}
                            onChange={e =>
                                setData((prev: ITattooImage) => ({
                                    ...prev,
                                    isLive: e.target.checked,
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
