import { Modal } from "shared/ui/Modal"
import { useEffect, useMemo, useState } from "react"
import { Dropdown } from "shared/ui/Dropdown"
import { getImagesDoc, rewriteImagesDoc } from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { tattooLiveDropdownOptions } from "../../const/const"
import styles from "./EditBulkTattooImages.module.scss"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { PlusIcon } from "shared/ui/Icons"

export function EditBulkTattooImages({
    imagesId,
    filtersData,
    triggerRefetch,
}: {
    imagesId: number[]
    filtersData: IFilter[]
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
        const options = filtersData.map(item => {
            const otherOptions = item.items.map(innerItem => ({
                label: innerItem.label[defaultLanguage],
                value: innerItem.key,
            }))
            return {
                name: item.title[defaultLanguage],
                options: [
                    { label: `No ${item.title[defaultLanguage]}`, value: "Unassigned" },
                    ...otherOptions,
                ],
            }
        })
        return options
    }, [filtersData])

    return (
        <>
            <Modal
                isOpen={isOpen || isLoading}
                onClose={() => null}
                className={styles.container}
                contentClassName={styles.content}
            >
                {isLoading ? (
                    "Loading..."
                ) : (
                    <>
                        <div className={styles.cross} onClick={onClose}>
                            <PlusIcon />
                        </div>
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
                        <div className={styles.btnContainer}>
                            <button onClick={saveClickHandler} className={styles.modalBtn}>
                                Save
                            </button>
                            <button onClick={discardClickHandler} className={styles.modalBtn}>
                                Discard
                            </button>
                        </div>
                    </>
                )}
            </Modal>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Edit Selected
            </button>
        </>
    )
}
