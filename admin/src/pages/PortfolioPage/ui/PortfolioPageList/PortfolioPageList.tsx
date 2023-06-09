import { ITattooImage } from "shared/types/types"
import { EditTattooImage } from "features/editTattooImage"
import { DeleteTattooImage } from "features/deleteTattooImage"
import styles from "./PortfolioPageList.module.scss"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ViewType } from "../../types/types"

export function PortfolioPageList({
    data,
    view,
    triggerRefetch,
}: {
    data: ITattooImage[]
    view: ViewType
    triggerRefetch: () => void
}) {
    return view === "icons" ? (
        <div className={styles.icons}>
            {data.map((item, index) => (
                <div className={styles.item} key={index}>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>id: {item.id}</div>
                    <div>artist: {item.artist}</div>
                    <div>style: {item.style}</div>
                    <div>color: {item.color}</div>
                    <div>{item.isLive ? "Published" : "Unpublished"}</div>
                    <div className={styles.buttons}>
                        <EditTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                        <DeleteTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className={styles.table}>
            {data.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div>id: {item.id}</div>
                    <ModalImage className={styles.img} url={item.img} />
                    <div>artist: {item.artist}</div>
                    <div>style: {item.style}</div>
                    <div>color: {item.color}</div>
                    <div>{item.isLive ? "Published" : "Unpublished"}</div>
                    <div>
                        <EditTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                        <DeleteTattooImage id={item.id} triggerRefetch={triggerRefetch} />
                    </div>
                </div>
            ))}
        </div>
    )
}
