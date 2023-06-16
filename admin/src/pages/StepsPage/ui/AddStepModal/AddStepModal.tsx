import { useState } from "react"
import { FilePond } from "react-filepond"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddStepModal.module.scss"
import { IStepsData } from "pages/StepsPage/types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { Language } from "shared/types/types"

export function AddStepModal({ stepData }: { stepData: IStepsData[] }) {
    const [data, setData] = useState({ id: 0, title: "", description: "" })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: Language) {
        setCurrentLanguage(lang)
    }

    const dropdownNumbers = Array(stepData.length)
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
            >
                <div className={styles.container}>
                    <FilePond />
                    <div>
                        id:
                        <Dropdown
                            options={dropdownNumbers}
                            value={data.id?.toString()}
                            onChange={id => setData(prev => ({ ...prev, id: +id }))}
                        />
                    </div>
                    <Input
                        label="Title"
                        value={data.title}
                        onChange={value => setData(prev => ({ ...prev, title: value }))}
                    />
                    <Textarea
                        label="Description"
                        onChange={value => setData(prev => ({ ...prev, description: value }))}
                    />
                    <button>save</button>
                    <button>discard</button>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
