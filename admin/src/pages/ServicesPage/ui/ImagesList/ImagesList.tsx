import { ModalImage } from "shared/components/ModalImage/ModalImage"
import styles from "./ImagesList.module.scss"

export function ImagesList({ data, onDelete }: { data: string[]; onDelete: (v: string) => void }) {
    return data.map((item, index) => {
        return (
            <div className={styles.container}>
                <ModalImage key={index} url={item || ""} className={styles.img} />
                <button onClick={() => onDelete(item)}>del</button>
            </div>
        )
    })
}
