import { Modal } from "shared/ui/Modal"
import { useEffect, useMemo, useState } from "react"
import { Dropdown } from "shared/ui/Dropdown"
import { getImagesDoc, rewriteImagesDoc } from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { tattooLiveDropdownOptions } from "../../const/const"
import { IFilters } from "features/portfolioFilters/types/types"
import styles from "./EditBulkTattooImages.module.scss"

export function EditBulkTattooImages({
    imagesId,
    filtersData,
    triggerRefetch,
}: {
    imagesId: number[]
    filtersData: IFilters | null
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [newData, setNewData] = useState<{ [key: string]: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function refreshNewData() {
        if (filtersData) {
            const f: { [key: string]: string } = { isLive: "" }
            Object.keys(filtersData).forEach(item => (f[item] = ""))
            setNewData(f)
        }
    }

    useEffect(() => {
        refreshNewData()
    }, [filtersData])

    async function saveClickHandler() {
        if (!newData) return
        if (Object.values(newData).every(item => item === "")) {
            Alert.warning("Nothing to save")
            return
        }

        const dataToUpload: {
            [key: string]: string | boolean
        } = { ...newData }

        for (const key in dataToUpload) {
            if (dataToUpload[key] === "") {
                delete dataToUpload[key]
            }
            if (dataToUpload[key] === "Unassigned") {
                dataToUpload[key] = ""
            }
            if (key === "isLive") {
                dataToUpload[key] = dataToUpload[key] === "live"
            }
        }

        setIsLoading(true)
        try {
            const currentDoc = await getImagesDoc()
            if (!currentDoc) return
            const currentData = currentDoc.data()
            const nData = { ...currentData }

            imagesId.forEach(itemId => {
                nData[itemId] = {
                    ...nData[itemId],
                    filters: { ...nData[itemId].filters, ...dataToUpload },
                }
            })
            await rewriteImagesDoc(nData)
            Alert.success(`Successfully edited ${imagesId.length} images`)
        } catch (error) {
            Alert.error("Unexpected error")
        }
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
        triggerRefetch?.()
    }

    function discardClickHandler() {
        refreshNewData()
        setIsLoading(false)
        setIsOpen(false)
    }

    const dropdownOptions = useMemo(() => {
        const options = []
        for (const key in filtersData) {
            const otherOptions = filtersData[key].map(item => ({
                label: item.label,
                value: item.key,
            }))
            const option = {
                name: key,
                options: [{ label: `No ${key}`, value: "Unassigned" }, ...otherOptions],
            }
            options.push(option)
        }
        return options
    }, [filtersData])

    return (
        <>
            <Modal isOpen={isOpen || isLoading} onClose={onClose} className={styles.container}>
                {isLoading ? (
                    "Loading..."
                ) : (
                    <>
                        <h4>Edit {imagesId.length} images</h4>
                        {dropdownOptions.map(item => {
                            return (
                                <div>
                                    {item.name}:
                                    <Dropdown
                                        firstOptionText={`Select ${item.name}`}
                                        options={item.options}
                                        value={newData?.[item.name] as string}
                                        onChange={value =>
                                            setNewData(prev => ({
                                                ...prev,
                                                [item.name]: value,
                                            }))
                                        }
                                    />
                                </div>
                            )
                        })}
                        <div>
                            published:
                            <Dropdown
                                firstOptionText="Publish / Unpublish"
                                options={tattooLiveDropdownOptions}
                                value={newData?.isLive}
                                onChange={isLive =>
                                    setNewData(prev => ({
                                        ...prev,
                                        isLive,
                                    }))
                                }
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
