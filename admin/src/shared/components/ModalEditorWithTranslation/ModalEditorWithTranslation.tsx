import { Languages } from "pages/StepsPage/ui/Languages/Languages"
import { ReactNode } from "react"
import { Language } from "shared/types/types"
import { Modal } from "shared/ui/Modal"

interface IModalEditorWithTranslation {
    children: ReactNode
    isOpen: boolean
    currentLanguage: Language
    onClose: () => void
    onChangeLanguage: (language: Language) => void
}

export function ModalEditorWithTranslation(props: IModalEditorWithTranslation) {
    const { children, isOpen, onClose, onChangeLanguage, currentLanguage } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Languages currentLanguage={currentLanguage} onChangeLanguage={onChangeLanguage} />
            {children}
        </Modal>
    )
}
