import { useEffect, useState } from "react"
import { IGlobalData, ILayoutData } from "../../types/type"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { defaultLanguage } from "shared/const/languages"
import { LanguageType } from "shared/types/types"
import { Input } from "shared/ui/Input/Input"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateLayoutData } from "shared/const/firebaseVariables"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"

const defaultNewAllData: ILayoutData = {
    footerList: {
        en: {
            0: "",
            1: "",
            2: "",
        },
        ro: {
            0: "",
            1: "",
            2: "",
        },
        ru: {
            0: "",
            1: "",
            2: "",
        },
    },
    navList: {
        en: {
            0: {
                text: "",
                link: "",
            },
            1: {
                text: "",
                link: "",
            },
            2: {
                text: "",
                link: "",
            },
            3: {
                text: "",
                link: "",
            },
            4: {
                text: "",
                link: "",
            },
        },
        ro: {
            0: {
                text: "",
                link: "",
            },
            1: {
                text: "",
                link: "",
            },
            2: {
                text: "",
                link: "",
            },
            3: {
                text: "",
                link: "",
            },
            4: {
                text: "",
                link: "",
            },
        },
        ru: {
            0: {
                text: "",
                link: "",
            },
            1: {
                text: "",
                link: "",
            },
            2: {
                text: "",
                link: "",
            },
            3: {
                text: "",
                link: "",
            },
            4: {
                text: "",
                link: "",
            },
        },
    },
}

export function LayoutData({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [newAllData, setNewAllData] = useState(defaultNewAllData)

    useEffect(() => {
        refreshNewData()
    }, [data])

    function refreshNewData() {
        if (data) {
            setNewAllData(data.layoutData)
        }
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    async function saveClickHandler() {
        if (!data) return
        if (isDeepEqual(data.layoutData, newAllData)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            await updateLayoutData(newAllData)
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        triggerRefetch()
    }

    function footerChangeHandler(value: string, index: number) {
        setNewAllData(prev => ({
            ...prev,
            footerList: {
                ...prev.footerList,
                [currentLanguage]: {
                    ...prev.footerList[currentLanguage],
                    [index]: value,
                },
            },
        }))
    }

    function navChangeHandler(value: string, index: number) {
        setNewAllData(prev => ({
            ...prev,
            navList: {
                ...prev.navList,
                [currentLanguage]: {
                    ...prev.navList[currentLanguage],
                    [index]: { ...prev.navList[currentLanguage][index], text: value },
                },
            },
        }))
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div>
                    Footer List
                    <Input
                        label="Location"
                        value={newAllData.footerList[currentLanguage][0]}
                        onChange={value => footerChangeHandler(value, 0)}
                    />
                    <Input
                        label="Contacts"
                        value={newAllData.footerList[currentLanguage][1]}
                        onChange={value => footerChangeHandler(value, 1)}
                    />
                    <Input
                        label="Follow"
                        value={newAllData.footerList[currentLanguage][2]}
                        onChange={value => footerChangeHandler(value, 2)}
                    />
                </div>
                <div>
                    Navlist List
                    <Input
                        label="Main"
                        value={newAllData.navList[currentLanguage][0].text}
                        onChange={value => navChangeHandler(value, 0)}
                    />
                    <Input
                        label="Portfolio"
                        value={newAllData.navList[currentLanguage][1].text}
                        onChange={value => navChangeHandler(value, 1)}
                    />
                    <Input
                        label="FAQ"
                        value={newAllData.navList[currentLanguage][2].text}
                        onChange={value => navChangeHandler(value, 2)}
                    />
                    <Input
                        label="Contacts"
                        value={newAllData.navList[currentLanguage][3].text}
                        onChange={value => navChangeHandler(value, 3)}
                    />
                    <Input
                        label="Testimonial"
                        value={newAllData.navList[currentLanguage][4].text}
                        onChange={value => navChangeHandler(value, 4)}
                    />
                </div>
            </ModalEditor>
            <div>
                <div>
                    Footer List
                    <p>Location : {data?.layoutData.footerList[defaultLanguage][0] || ""}</p>
                    <p>Contacts : {data?.layoutData.footerList[defaultLanguage][1] || ""}</p>
                    <p>Follow : {data?.layoutData.footerList[defaultLanguage][2] || ""}</p>
                </div>
                <div>
                    Navlist List
                    <p>Main : {data?.layoutData.navList[defaultLanguage][0].text || ""}</p>
                    <p>Portfolio : {data?.layoutData.navList[defaultLanguage][1].text || ""}</p>
                    <p>FAQ : {data?.layoutData.navList[defaultLanguage][2].text || ""}</p>
                    <p>Contacts : {data?.layoutData.navList[defaultLanguage][3].text || ""}</p>
                    <p>Testimonial : {data?.layoutData.navList[defaultLanguage][4].text || ""}</p>
                </div>
                <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
        </>
    )
}
