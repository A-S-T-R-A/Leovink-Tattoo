import { Alert } from "shared/ui/CustomNotifications"
import styles from "./EditVideo.module.scss"
import { v4 as uuid } from "uuid"

export function EditVideo({ onChange }: { onChange: (v: Blob) => void }) {
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"]
    const maxSize = 10 * 1024 * 1024

    const id = uuid()

    async function videoChangeHandler(e: any) {
        const file = e.target.files[0]

        if (!file) {
            e.target.value = null
            return
        }

        if (file.size > maxSize) {
            Alert.warning("File size exceeds the maximum allowed limit.")
            e.target.value = null
            return
        }

        if (!allowedTypes.includes(file.type)) {
            Alert.warning("Invalid file type. Please select a MP4, WebM, or QuickTime video.")
            e.target.value = null
            return
        }
        const reader = new FileReader()

        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
            const arrayBuffer = reader.result as ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: file.type })
            onChange?.(blob)
        }
    }

    return (
        <div>
            <label htmlFor={id}>Edit</label>
            <input type="file" id={id} className={styles.file} onChange={videoChangeHandler} />
        </div>
    )
}
