import styles from "./PortfolioPageHeader.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { ViewType } from "../../types/types"
import { localStorageView } from "pages/PortfolioPage/lib/localStorageLib"
import { UploadModal } from "../uploadTattooImage/UploadModal"
import { TriggerRefetchBtn } from "shared/components/TriggerRefetchBtn/TriggerRefetchBtn"
import { DownArrowIcon, TableIcons, TableRows } from "shared/assets/icons"

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
            <div className={styles.uploadBtn}>
                <UploadModal triggerRefetch={triggerRefetch} />
            </div>
            <TriggerRefetchBtn triggerRefetch={triggerRefetch} />
            <div className={styles.viewToggle}>
                <button
                    onClick={() => changeView("table")}
                    className={classNames(styles.iconBlock, {
                        [styles.selectedView]: view === "table",
                    })}
                >
                    <TableRows className={styles.icon} />
                </button>
                <button
                    onClick={() => changeView("icons")}
                    className={classNames(styles.iconBlock, {
                        [styles.selectedView]: view === "icons",
                    })}
                >
                    <TableIcons className={styles.icon} />
                </button>
            </div>
        </div>
    )
}
