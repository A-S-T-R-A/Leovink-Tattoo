import { useState, useEffect } from "react"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import {
    TattooArtists,
    TattooColors,
    TattooStyles,
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { ITattooImage } from "shared/types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { Modal } from "shared/ui/Modal"
import styles from "./EditModal.module.scss"
import { getDocs } from "firebase/firestore"
import { portfolioPicturesRef } from "shared/const/firebaseVariables"

interface IEditModalProps {
    data: ITattooImage
    isOpen: boolean
    onClose: () => void
    setData: (data: React.Dispatch<React.SetStateAction<ITattooImage>>) => void
    saveClickHandler: () => void
    discardClickHandler: () => void
}

export function EditModal(props: IEditModalProps) {
    const { data, isOpen, onClose, setData, saveClickHandler, discardClickHandler } = props
    const [length, setLength] = useState(0)

    async function getLength() {
        const docs = await getDocs(portfolioPicturesRef)
        setLength(docs.size)
    }

    useEffect(() => {
        getLength()
    }, [data])

    const dropdownNumbers = Array(length)
        .fill("")
        .map((_, index) => {
            const v = (index + 1).toString()
            return { label: v, value: v }
        })

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                id:
                <Dropdown
                    options={dropdownNumbers}
                    value={data.id?.toString()}
                    onChange={id => setData(prev => ({ ...prev, id: +id }))}
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
                    onChange={artist => setData(prev => ({ ...prev, artist }))}
                />
            </div>
            <div>
                style:{" "}
                <Dropdown
                    options={tattooStylesDropdownOptions}
                    value={data.style}
                    onChange={style => setData(prev => ({ ...prev, style }))}
                />
            </div>
            <div>
                color:{" "}
                <Dropdown
                    options={tattooColorsDropdownOptions}
                    value={data.color}
                    onChange={color => setData(prev => ({ ...prev, color }))}
                />
            </div>
            <div>
                live:
                <input
                    type="checkbox"
                    checked={data.isLive}
                    onChange={e => setData(prev => ({ ...prev, isLive: e.target.checked }))}
                />
            </div>
            <button onClick={saveClickHandler}>Save</button>
            <button onClick={discardClickHandler}>Discard</button>
        </Modal>
    )
}
