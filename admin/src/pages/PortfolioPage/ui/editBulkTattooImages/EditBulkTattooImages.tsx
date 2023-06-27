import { Modal } from "shared/ui/Modal"
import { useEffect, useState } from "react"
import { Dropdown } from "shared/ui/Dropdown"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { ArtistType, ColorType, StyleType } from "shared/types/types"
import { getImagesDoc, rewriteImagesDoc } from "shared/const/firebaseVariables"
import styles from "./EditBulkTattooImages.module.scss"
import { disableUi } from "shared/lib/disableUi/disableUi"
import { Alert } from "shared/ui/CustomNotifications"
import { tattooLiveDropdownOptions } from "../../const/const"

export function EditBulkTattooImages({
    imagesId,
    triggerRefetch,
}: {
    imagesId: number[]
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const defaultData = {
        artist: "" as ArtistType | "" | "Unassigned",
        style: "" as StyleType | "" | "Unassigned",
        color: "" as ColorType | "" | "Unassigned",
        isLive: "",
    }
    const [data, setData] = useState<typeof defaultData>(defaultData)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        isLoading ? disableUi.disable() : disableUi.enable()
    }, [isLoading])

    function onClose() {
        setIsOpen(false)
    }

    async function saveClickHandler() {
        const { artist, style, color, isLive } = data
        const newData: any = {}
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
            Alert.info("Nothing to edit")
            return
        }

        setIsLoading(true)

        const currentDoc = await getImagesDoc()
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const nData = { ...currentData }

        imagesId.forEach(itemId => {
            nData[itemId] = { ...nData[itemId], ...data }
        })

        try {
            await rewriteImagesDoc(nData)
            Alert.success(`Successfully edited ${imagesId.length} images`)
            setIsOpen(false)
            setData(defaultData)
            triggerRefetch?.()
        } catch (error) {
            Alert.error("Unexpected error")
            setIsOpen(false)
            setData(defaultData)
            triggerRefetch?.()
        }
        setIsLoading(false)
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
            <Modal isOpen={isOpen || isLoading} onClose={onClose} className={styles.container}>
                {isLoading ? (
                    "Loading..."
                ) : (
                    <>
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
                    </>
                )}
            </Modal>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Edit Selected
            </button>
        </>
    )
}
