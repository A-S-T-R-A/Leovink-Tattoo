import { useState } from "react"
import { FilePond } from "react-filepond"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input, InputType } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"

export function AddStepModal() {
    const [data, setData] = useState({ id: 0, title: "", description: "" })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState("en")

    console.log(currentLanguage, data)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: string) {
        setCurrentLanguage(lang)
    }

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
            >
                <FilePond />
                <Input
                    label="step"
                    type={InputType.NUMBER}
                    value={data.id}
                    onChange={value => setData(prev => ({ ...prev, id: +value }))}
                />
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
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
