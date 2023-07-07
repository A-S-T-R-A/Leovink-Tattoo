import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import styles from "./EditSocialMedia.module.scss"
import { ISocialMedia } from "../../types/type"

export function EditSocialMedia({ social }: { social: ISocialMedia }) {
    const [data, setData] = useState<ISocialMedia>({ icon: "", link: "" })
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    return (
        <>
            <ModalEditor
                isOpen={isOpen}
                onClose={onClose}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <ModalImage url={social.icon} className={styles.img} />
                        <label htmlFor="my-file">Edit</label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
                    <Input
                        label="link"
                        value={social.link}
                        onChange={value => setData(prev => ({ ...prev, link: value }))}
                    />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
