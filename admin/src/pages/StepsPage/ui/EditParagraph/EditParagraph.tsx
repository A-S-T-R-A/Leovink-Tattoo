import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./EditParagraph.module.scss"
import { IStepsData } from "pages/StepsPage/types/types"
import { Dropdown } from "shared/ui/Dropdown"

export function EditParagraph({
    stepData,
    id,
    triggerRefetch,
    unselectAllHandler,
}: {
    stepData: IStepsData[]
    id?: number
    triggerRefetch?: () => void
    unselectAllHandler?: () => void
}) {
    const [data, setData] = useState({ id: 0, title: "", description: "" })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState("english")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: string) {
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
                    <div className={styles.imgContainer}>
                        <ModalImage
                            url="https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className={styles.img}
                        />
                        <label htmlFor="my-file">Edit</label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
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
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
