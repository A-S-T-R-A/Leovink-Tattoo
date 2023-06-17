import { Languages } from "shared/components/Languages/Languages"
import { ReactNode } from "react"
import { LanguageType } from "shared/types/types"
import { Modal } from "shared/ui/Modal"

interface IModalEditorWithTranslation {
    children: ReactNode
    isOpen: boolean
    currentLanguage: LanguageType
    onClose: () => void
    onChangeLanguage: (language: LanguageType) => void
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
