import styles from "./PortfolioPageHeader.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { ViewType } from "../../types/types"
import { localStorageView } from "pages/PortfolioPage/lib/localStorageLib"
import { UploadModal } from "../uploadTattooImage/UploadModal"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"

export function PortfolioPageHeader({
    view,
    setView,
    triggerRefetch,
}: {
    view: ViewType
    setView: (val: ViewType) => void
    triggerRefetch: () => void
}) {
    function changeView(view: ViewType) {
        setView(view)
        localStorageView.set(view)
    }

    return (
        <div className={styles.header}>
            <UploadModal triggerRefetch={triggerRefetch} />
            <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
            <div className={styles.viewToggle}>
                <button
                    onClick={() => changeView("table")}
                    className={classNames("", { [styles.selectedView]: view === "table" })}
                >
                    Table
                </button>
                <button
                    onClick={() => changeView("icons")}
                    className={classNames("", { [styles.selectedView]: view === "icons" })}
                >
                    Icons
                </button>
            </div>
        </div>
    )
}
