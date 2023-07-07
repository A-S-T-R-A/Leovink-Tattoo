import { AddressType, IAddressData, IGlobalData } from "../../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { updateAddressData } from "shared/const/firebaseVariables"
import { defaultLanguage } from "shared/const/languages"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { LanguageType } from "shared/types/types"
import { Alert } from "shared/ui/CustomNotifications"
import { Input } from "shared/ui/Input/Input"

export function Edit({
    data,
    addressType,
    triggerRefetch,
}: {
    data: IGlobalData | null
    addressType: AddressType
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState<AddressType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newAllData, setNewAllData] = useState<IAddressData | null>(null)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)

    useEffect(() => {
        refreshNewData()
    }, [data])

    console.log(newAllData)

    function refreshNewData() {
        if (data) {
            setNewAllData(data.addressData)
        }
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
        refreshNewData()
    }

    function discardClickHandler() {
        setIsOpen(null)
        setIsLoading(false)
        refreshNewData()
    }

    async function saveClickHandler() {
        if (!data || !newAllData) return
        if (isDeepEqual(newAllData, data.addressData)) {
            Alert.info("Nothing to Edit")
            return
        }

        setIsLoading(true)

        const addressDataToUpload = JSON.parse(JSON.stringify(data.addressData)) as IAddressData
        addressDataToUpload[addressType] = newAllData[addressType] as any

        try {
            await updateAddressData(addressDataToUpload)
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(null)
        setIsLoading(false)
        triggerRefetch()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditorWithTranslation
                isOpen={isOpen === "location"}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <Input
                    label="Address"
                    value={newAllData?.location[currentLanguage] || ""}
                    onChange={value =>
                        setNewAllData((prev: any) => ({
                            ...prev,
                            location: { ...prev?.location, [currentLanguage]: value },
                        }))
                    }
                />
            </ModalEditorWithTranslation>

            <ModalEditorWithTranslation
                isOpen={isOpen === "phone"}
                onChangeLanguage={() => null}
                currentLanguage={defaultLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                {newAllData?.phone.map((item, index) => (
                    <Input
                        key={index}
                        value={item}
                        onChange={value =>
                            setNewAllData((prev: any) => ({
                                ...prev,
                                phone: prev.phone.map((innerItem: string, innerIndex: number) => {
                                    if (innerIndex === index) {
                                        return value
                                    }
                                    return innerItem
                                }),
                            }))
                        }
                    />
                ))}
            </ModalEditorWithTranslation>

            <ModalEditorWithTranslation
                isOpen={isOpen === "mail"}
                onChangeLanguage={() => null}
                currentLanguage={defaultLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                {newAllData?.mail.map((item, index) => (
                    <Input
                        key={index}
                        value={item}
                        onChange={value =>
                            setNewAllData((prev: any) => ({
                                ...prev,
                                mail: prev.mail.map((innerItem: string, innerIndex: number) => {
                                    if (innerIndex === index) {
                                        return value
                                    }
                                    return innerItem
                                }),
                            }))
                        }
                    />
                ))}
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(addressType)}>Edit</button>
        </>
    )
}
