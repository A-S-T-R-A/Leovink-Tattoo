import { UploadModal } from "features/uploadTattooImage"
import styles from "./PortfolioPageHeader.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { ViewType } from "../../types/types"

export function PortfolioPageHeader({
    view,
    setView,
    triggerRefetch,
}: {
    view: ViewType
    setView: (val: ViewType) => void
    triggerRefetch: () => void
}) {
    return (
        <div className={styles.header}>
            <UploadModal triggerRefetch={triggerRefetch} />
            <div className={styles.viewToggle}>
                <button
                    onClick={() => setView("table")}
                    className={classNames("", { [styles.selectedView]: view === "table" })}
                >
                    Table
                </button>
                <button
                    onClick={() => setView("icons")}
                    className={classNames("", { [styles.selectedView]: view === "icons" })}
                >
                    Icons
                </button>
            </div>
        </div>
    )
}
