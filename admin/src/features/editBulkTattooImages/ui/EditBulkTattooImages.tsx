import { Modal } from "shared/ui/Modal"
import styles from "./EditBulkTattooImages.module.scss"
import { useState } from "react"
import { Dropdown } from "shared/ui/Dropdown"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { ArtistType, ColorType, StyleType } from "shared/types/types"
import {
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"
import { updateDoc } from "firebase/firestore"
import { tattooLiveDropdownOptions } from "../const/filterOptions"

export function EditBulkTattooImages({
    imagesId,
    triggerRefetch,
}: {
    imagesId: number[]
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const defaultData = {
        artist: "" as ArtistType,
        style: "" as StyleType,
        color: "" as ColorType,
        isLive: "",
    }
    const [data, setData] = useState<typeof defaultData>(defaultData)

    function onClose() {
        setIsOpen(false)
    }

    async function saveClickHandler() {
        const { artist, style, color, isLive } = data
        const newData = {}
        if (artist !== "") {
            newData.artist = artist === "Unassigned" ? "" : artist
        }
        if (style !== "") {
            newData.style = style === "Unassigned" ? "" : style
        }
        if (color !== "") {
            newData.color = color === "Unassigned" ? "" : color
        }
        if (isLive !== "") {
            newData.isLive = isLive === "live"
        }

        if (Object.keys(newData).length === 0) {
            alert("Nothing to edit")
            return
        }

        const editPromises = imagesId.map(async item => {
            const file = await getFirestoreDocumentById(item, portfolioPicturesRef)
            await updateDoc(getFirestoreDocumentByFileId(file.id), newData as any)
            return new Promise(res => res(true))
        })

        try {
            await Promise.all(editPromises)
            alert(`Successfully edited ${imagesId.length} images`)
            setIsOpen(false)
            setData(defaultData)
            triggerRefetch?.()
        } catch (error) {
            alert("Unexpected error")
            setIsOpen(false)
            setData(defaultData)
            triggerRefetch?.()
        }
    }

    function discardClickHandler() {
        setData(defaultData)
        setIsOpen(true)
    }

    const artistsOption = [
        { label: "No artist", value: "Unassigned" },
        ...tattooArtistsDropdownOptions,
    ]

    const stylesOption = [
        { label: "No style", value: "Unassigned" },
        ...tattooStylesDropdownOptions,
    ]

    const colorsOption = [
        { label: "No color", value: "Unassigned" },
        ...tattooColorsDropdownOptions,
    ]

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <h4>Edit {imagesId.length} images</h4>
                <div>
                    artist:
                    <Dropdown
                        firstOptionText="Select an artist"
                        options={artistsOption}
                        value={data.artist}
                        onChange={artist => setData((prev: any) => ({ ...prev, artist }))}
                    />
                </div>
                <div>
                    style:
                    <Dropdown
                        firstOptionText="Select a style"
                        options={stylesOption}
                        value={data.style}
                        onChange={style => setData((prev: any) => ({ ...prev, style }))}
                    />
                </div>
                <div>
                    color:
                    <Dropdown
                        firstOptionText="Select a color"
                        options={colorsOption}
                        value={data.color}
                        onChange={color => setData((prev: any) => ({ ...prev, color }))}
                    />
                </div>
                <div>
                    published:
                    <Dropdown
                        firstOptionText="Publish / Unpublish"
                        options={tattooLiveDropdownOptions}
                        value={data.isLive}
                        onChange={isLive => setData((prev: any) => ({ ...prev, isLive }))}
                    />
                </div>
                <button onClick={saveClickHandler}>Save</button>
                <button onClick={discardClickHandler}>Discard</button>
            </Modal>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Edit {imagesId.length} images
            </button>
        </>
    )
}
