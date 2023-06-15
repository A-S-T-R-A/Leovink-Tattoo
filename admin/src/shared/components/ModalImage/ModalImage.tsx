import { useState } from "react"
import { PlusIcon } from "shared/ui/Icons"
import { Modal } from "shared/ui/Modal"

import styles from "./ModalImage.module.scss"

export function ModalImage({ url, className }: { url: string; className?: string }) {
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    if (!url) return null
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} contentClassName={styles.container}>
                <div className={styles.cross} onClick={onClose}>
                    <PlusIcon />
                </div>
                <img src={url} className={styles.img} />
            </Modal>
            <img src={url} alt="" className={className} onClick={() => setIsOpen(true)} />
        </>
    )
}
