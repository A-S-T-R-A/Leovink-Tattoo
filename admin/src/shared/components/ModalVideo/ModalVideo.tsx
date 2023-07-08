import { useState } from "react"
import { PlayIcon, PlusIcon } from "shared/ui/Icons"
import { Modal } from "shared/ui/Modal"

import styles from "./ModalVideo.module.scss"

interface IModalVideo {
    video: string
    className?: string
}

export function ModalVideo(props: IModalVideo) {
    const { video, className } = props
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    if (!video) return null
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => null} contentClassName={styles.container}>
                <div className={styles.cross} onClick={onClose}>
                    <PlusIcon />
                </div>
                <video src={video} controls className={styles.ModalVideo} />
            </Modal>
            <div className={styles.videoContainer}>
                <video src={video} className={className} onClick={() => setIsOpen(true)} />
                <PlayIcon className={styles.playIcon} />
            </div>
        </>
    )
}
