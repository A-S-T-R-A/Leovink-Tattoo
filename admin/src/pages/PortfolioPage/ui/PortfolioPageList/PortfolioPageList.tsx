import { useState } from "react"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { ITattooImage, ViewType } from "../../types/types"
import styles from "./PortfolioPageList.module.scss"
import { EditTattooImage } from "../editTattooImage/EditTattoImage"
import { DeleteTattooImage } from "../deleteTattooImage/DeleteTattooImage"
import { EditBulkTattooImages } from "../editBulkTattooImages/EditBulkTattooImages"
import { DeleteBulkTattooImages } from "../deleteBulkTattooImages/DeleteBulkTattooImages"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { TableIcons } from "./Tables/TableIcons/TableIcons"
import { DeleteIcon, EditIcon } from "shared/assets/icons"
import { v4 as uuidv4 } from "uuid"
import { TableRows } from "./Tables/TableRows"

export function PortfolioPageList({
    data,
    filteredData,
    view,
    filtersData,
    triggerRefetch,
}: {
    data: ITattooImage[]
    filteredData: ITattooImage[]
    view: ViewType
    filtersData: IFilter[]
    triggerRefetch: () => void
}) {
    const [selected, setSelected] = useState<number[]>([])

    function checkboxChangeHandler(id: number) {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(item => item !== id))
        } else {
            setSelected(prev => [...prev, id])
        }
    }

    function selectAllHandler() {
        if (filteredData.length === selected.length) {
            setSelected([])
        } else {
            setSelected(filteredData.map(item => item.id))
        }
    }

    function unselectAllHandler() {
        setSelected([])
    }

    const uuid = uuidv4()
    const filterKeys = filtersData.map(item => item.title[defaultLanguage])

    return view === "icons" ? (
        <TableIcons
            triggerRefetch={triggerRefetch}
            data={data}
            filtersData={filtersData}
            view="icons"
            filteredData={filteredData}
        />
    ) : (
        <TableRows
            data={data}
            filteredData={filteredData}
            view="table"
            filtersData={filtersData}
            triggerRefetch={triggerRefetch}
        />
    )
}
