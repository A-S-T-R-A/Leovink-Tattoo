import { useState } from "preact/hooks"
import { PlusIcon } from "shared/ui/Icons"
import { Modal } from "shared/ui/Modal"

import styles from "./ModalImage.module.scss"
import { Image } from "shared/ui/Image/Image"

export function ModalImage({
    url,
    className,
    alt,
}: {
    url: string
    className?: string
    alt?: string
}) {
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
                <Image src={url} alt={`${alt}. Service.`} className={styles.img} />
            </Modal>
            <Image
                src={url}
                alt={`${alt} img.`}
                className={className}
                onClick={() => setIsOpen(true)}
            />
        </>
    )
}
