import { Languages } from "shared/components/Languages/Languages"
import { ReactNode } from "react"
import { LanguageType } from "shared/types/types"
import { Modal } from "shared/ui/Modal"
import styles from "./ModalEditor.module.scss"
import { PlusIcon } from "shared/ui/Icons"

interface IModalEditor {
    withTranslation?: boolean
    isOverlayClose?: boolean
    children: ReactNode
    isOpen: boolean
    currentLanguage?: LanguageType
    onClose: () => void
    onChangeLanguage?: (language: LanguageType) => void
    onSaveClick: () => void
    onDiscardClick: () => void
}

export function ModalEditor(props: IModalEditor) {
    const {
        withTranslation = false,
        isOverlayClose = false,
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
            onClose={isOverlayClose === true ? onClose : () => null}
            className={styles.container}
            contentClassName={styles.content}
        >
            <div className={styles.cross} onClick={onClose}>
                <PlusIcon />
            </div>
            {withTranslation && (
                <Languages
                    currentLanguage={withTranslation ? currentLanguage : undefined}
                    onChangeLanguage={withTranslation ? onChangeLanguage : undefined}
                />
            )}
            {children}
            <div className={styles.btnContainer}>
                <button onClick={onSaveClick}>save</button>
                <button onClick={onDiscardClick}>discard</button>
            </div>
        </Modal>
    )
}
