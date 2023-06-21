import { useState } from "react"
import { FilePond } from "react-filepond"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddStepModal.module.scss"
import { IStepsData, ITranslatedStepsData } from "../../types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"

export function AddStepModal({ length }: { length: number }) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")
    const [currentStepData, setCurrentStepData] = useState({ img: "", description: "", title: "" })
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    const dropdownNumbers = Array(length)
        .fill("")
        .map((_, index) => {
            const v = (index + 1).toString()
            return { label: v, value: v }
        })

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <FilePond />
                    {/* <div>
                        id:
                        <Dropdown
                            options={dropdownNumbers}
                            value={data.id?.toString()}
                            onChange={id => setData(prev => ({ ...prev, id: +id }))}
                        />
                    </div> */}
                    <Input
                        label="Title"
                        value={currentStepData.title}
                        onChange={value => setCurrentStepData(prev => ({ ...prev, title: value }))}
                    />
                    <Textarea
                        label="Description"
                        value={currentStepData.description}
                        onChange={value =>
                            setCurrentStepData(prev => ({ ...prev, description: value }))
                        }
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
