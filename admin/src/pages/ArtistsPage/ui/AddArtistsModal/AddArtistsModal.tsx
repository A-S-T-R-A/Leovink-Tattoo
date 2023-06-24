import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddArtistsModal.module.scss"
import { LanguageType } from "shared/types/types"
import { IArtistsData } from "../../types/types"

export function AddArtistsModal({ artistsData }: { artistsData: IArtistsData[] }) {
    const [data, setData] = useState<IArtistsData>({
        name: "",
        description: "",
        specialization: "",
        img: "",
        slug: "",
    })

    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

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
                        Photo:
                        <label htmlFor="my-file" className={styles.fileLabel}>
                            add
                        </label>
                        <input type="file" id="my-file" className={styles.file} />
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
                            onChange={value => setData(prev => ({ ...prev, tattoo_artist: value }))}
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Description"
                            value={data.description}
                            onChange={value => setData(prev => ({ ...prev, description: value }))}
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
