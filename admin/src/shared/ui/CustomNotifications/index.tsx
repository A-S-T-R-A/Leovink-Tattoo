import { errorIcon } from "./svg/errorIcon"
import { alertConstructor } from "./ui/Alert/alertConstructor"
import { warningIcon } from "./svg/warningIcon"
import { infoIcon } from "./svg/infoIcon"
import { successIcon } from "./svg/successIcon"

export const Alert = {
    error(message: string) {
        alertConstructor(message, errorIcon, "Error message:", "error")
    },
    warning(message: string) {
        alertConstructor(message, warningIcon, "Warning message:", "warning")
    },
    info(message: string) {
        alertConstructor(message, infoIcon, "Info message:", "info")
    },
    success(message: string) {
        alertConstructor(message, successIcon, "Success message:", "success")
    },
}

export { Confirm } from "./ui/Confirm/confirm"
