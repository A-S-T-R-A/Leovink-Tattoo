import { Languages } from "shared/components/Languages/Languages"
import { ReactNode } from "react"
import { LanguageType } from "shared/types/types"
import { Modal } from "shared/ui/Modal"
import styles from "./ModalEditorWithTranslation.module.scss"
import { PlusIcon } from "shared/ui/Icons"

interface IModalEditorWithTranslation {
    children: ReactNode
    isOpen: boolean
    currentLanguage: LanguageType
    onClose?: () => void
    onChangeLanguage: (language: LanguageType) => void
    onSaveClick: () => void
    onDiscardClick: () => void
}

export function ModalEditorWithTranslation(props: IModalEditorWithTranslation) {
    const {
        children,
        isOpen,
        onClose = () => null,
        onChangeLanguage,
        currentLanguage,
        onSaveClick,
        onDiscardClick,
    } = props

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => null}
            className={styles.container}
            contentClassName={styles.content}
        >
            <div className={styles.cross} onClick={onClose}>
                <PlusIcon />
            </div>
            <Languages currentLanguage={currentLanguage} onChangeLanguage={onChangeLanguage} />
            {children}
            <div className={styles.btnContainer}>
                <button onClick={onSaveClick}>save</button>
                <button onClick={onDiscardClick}>discard</button>
            </div>
        </Modal>
    )
}
