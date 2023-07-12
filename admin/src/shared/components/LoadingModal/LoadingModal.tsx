import { Modal } from "shared/ui/Modal"

import styles from "./LoadingModal.module.scss"

export function LoadingModal({ isLoading }: { isLoading: boolean; className?: string }) {
    return (
        <Modal isOpen={isLoading} onClose={() => null} contentClassName={styles.container}>
            <div>Loading ...</div>
        </Modal>
    )
}
