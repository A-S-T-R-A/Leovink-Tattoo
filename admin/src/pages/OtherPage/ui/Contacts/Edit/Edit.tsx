import { AddressType, IGlobalData } from "../../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { defaultLanguage } from "shared/const/languages"

export function Edit({
    data,
    addressType,
    triggerRefetch,
}: {
    data: IGlobalData | null
    addressType: AddressType
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newData, setNewData] = useState<any>(null)

    useEffect(() => {
        refreshNewData()
    }, [])

    function refreshNewData() {
        if (data) {
            setNewData(data.addressData[addressType])
        }
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
        triggerRefetch()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onChangeLanguage={() => null}
                currentLanguage={defaultLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div>
                    <ModalImage url={newData?.icon || previewImage.url} className={styles.img} />
                    <EditImage onChange={editImageChangeHandler} />
                    <Input
                        value={newData?.link || ""}
                        onChange={link => setNewData((prev: any) => ({ ...prev, link }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(false)}>Edit</button>
        </>
    )
}
