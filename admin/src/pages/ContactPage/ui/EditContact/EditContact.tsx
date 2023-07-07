import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import styles from "./EditContact.module.scss"
import { Input } from "shared/ui/Input/Input"

export function EditContact({ label, contact }: { label: string; contact: string }) {
    const [info, setInfo] = useState("")
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
                    <Input label={label} value={contact} onChange={value => setInfo(value)} />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
