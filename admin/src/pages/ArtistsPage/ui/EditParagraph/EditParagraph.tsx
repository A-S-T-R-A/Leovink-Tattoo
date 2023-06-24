import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import styles from "./EditParagraph.module.scss"
import { IArtistsData } from "../../types/types"

export function EditParagraph({ artistData, id }: { artistData: IArtistsData; id: number }) {
    const [data, setData] = useState({
        id: -1,
        img: "",
        name: "",
        specialization: "",
        description: "",
    })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    /*  const dropdownNumbers = Array(artistData.length)
        .fill("")
        .map((_, index) => {
            const v = index.toString()
            return { label: v, value: v }
        }) */

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
                    <div className={styles.imgContainer}>
                        photo:
                        <ModalImage url={artistData.img} className={styles.img} />
                        <label htmlFor="my-file">Edit</label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
                    <div>
                        id: {id}
                        {/* <Dropdown
                            options={dropdownNumbers}
                            value={data.id?.toString()}
                            onChange={id => setData(prev => ({ ...prev, id: +id }))}
                        /> */}
                    </div>
                    <div>
                        <Input
                            label="Name"
                            value={artistData.name}
                            onChange={value => setData(prev => ({ ...prev, name: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Specialization"
                            value={artistData.specialization}
                            onChange={value =>
                                setData(prev => ({ ...prev, specialization: value }))
                            }
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Description"
                            value={artistData.description}
                            onChange={value => setData(prev => ({ ...prev, description: value }))}
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
