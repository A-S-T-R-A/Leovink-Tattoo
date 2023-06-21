import styles from "./EditImage.module.scss"
import { v4 as uuid } from "uuid"

export function EditImage({ onChange }: { onChange: (v: string) => void }) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    const maxSize = 0.5 * 1024 * 1024

    const id = uuid()

    async function imageChangeHandler(e: any) {
        const file = e.target.files[0]
        const reader = new FileReader()

        if (!file) {
            e.target.value = null
            return
        }

        if (file.size > maxSize) {
            alert("File size exceeds the maximum allowed limit.")
            e.target.value = null
            return
        }

        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please select a JPEG, PNG or WEBP image.")
            e.target.value = null
            return
        }

        reader.readAsDataURL(file)
        reader.onload = () => {
            const imageDataURL = reader.result
            onChange?.(imageDataURL as string)
        }
    }

    return (
        <>
            <label htmlFor={id}>Edit</label>
            <input type="file" id={id} className={styles.file} onChange={imageChangeHandler} />
        </>
    )
}
