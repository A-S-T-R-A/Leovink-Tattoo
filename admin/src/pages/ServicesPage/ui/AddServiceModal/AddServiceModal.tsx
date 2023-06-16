import { useState } from "react"
import { FilePond } from "react-filepond"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddServiceModal.module.scss"
import { Dropdown } from "shared/ui/Dropdown"
import { Language } from "shared/types/types"
import { IServiceData } from "pages/ServicesPage/types/types"

export function AddServiceModal({ serviceData }: { serviceData: IServiceData[] }) {
    const [data, setData] = useState({ id: 0, img: "", title: "", description: "" })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: Language) {
        setCurrentLanguage(lang)
    }

    const dropdownNumbers = Array(serviceData.length)
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
                        <label htmlFor="my-file" className={styles.fileLabel}>
                            Edit
                        </label>
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
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
