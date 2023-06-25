import { errorAlert } from "./ui/errorAlert/errorAlert"
import { infoAlert } from "./ui/infoAlert/infoAlert"
import { successAlert } from "./ui/successAlert/successAlert"
import { warningAlert } from "./ui/warningAlert/warningAlert"

export const Alert = {
    error(message: string) {
        errorAlert(message)
    },
    warning(message: string) {
        warningAlert(message)
    },
    info(message: string) {
        infoAlert(message)
    },
    success(message: string) {
        successAlert(message)
    },
}
