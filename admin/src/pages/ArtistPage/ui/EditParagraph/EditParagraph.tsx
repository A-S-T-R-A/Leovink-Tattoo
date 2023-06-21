import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import styles from "./EditParagraph.module.scss"
import { IReviewData } from "pages/ReviewPage/types/types"
import { IArtistData } from "pages/ArtistPage/types/types"

export function EditParagraph({
    artistData,
    id,
    triggerRefetch,
    unselectAllHandler,
}: {
    artistData: IArtistData[]
    id?: number
    triggerRefetch?: () => void
    unselectAllHandler?: () => void
}) {
    const [data, setData] = useState({
        id: 0,
        photo: "",
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

    const dropdownNumbers = Array(artistData.length)
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
                    <div className={styles.imgContainer}>
                        photo:
                        <ModalImage url={artistData[0].photo} className={styles.img} />
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
                    <div>
                        <Input
                            label="Name"
                            value={data.name}
                            onChange={value => setData(prev => ({ ...prev, title: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Specialization"
                            value={data.specialization}
                            onChange={value =>
                                setData(prev => ({ ...prev, specialization: value }))
                            }
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Description"
                            onChange={value => setData(prev => ({ ...prev, description: value }))}
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
