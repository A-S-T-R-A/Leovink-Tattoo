import { ModalImage } from "shared/components/ModalImage/ModalImage"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { ITattooImage, LanguageType } from "shared/types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { Modal } from "shared/ui/Modal"
import styles from "./EditModal.module.scss"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Languages } from "shared/components/Languages/Languages"

interface IEditModalProps {
    length: number
    data: ITattooImage
    isOpen: boolean
    isLoading: boolean
    currentLanguage: LanguageType
    onClose: () => void
    setData: (data: any) => void
    saveClickHandler: () => void
    discardClickHandler: () => void
    onChangeLanguage: (language: LanguageType) => void
}

export function EditModal(props: IEditModalProps) {
    const {
        currentLanguage,
        length,
        data,
        isOpen,
        isLoading,
        onClose,
        setData,
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

    return (
        <Modal isOpen={isOpen || isLoading} onClose={onClose}>
            {isLoading ? (
                "Loading..."
            ) : (
                <div className={styles.container}>
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
                    <div className={styles.description}>
                        <p>description:</p>
                        <div>
                            <Textarea
                                value={data.alt[currentLanguage]}
                                onChange={alt =>
                                    setData((prev: ITattooImage) => ({
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
                </div>
            )}
        </Modal>
    )
}
