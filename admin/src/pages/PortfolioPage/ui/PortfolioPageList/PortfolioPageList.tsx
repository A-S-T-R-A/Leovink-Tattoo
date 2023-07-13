import { useState } from "react"
import { ITattooImage, ViewType } from "../../types/types"
import { IFilter } from "features/portfolioFilters/types/types"
import { TableIcons } from "./Tables/TableIcons/TableIcons"

import { TableRows } from "./Tables/TableRows/TableRows"

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

    return view === "icons" ? (
        <TableIcons
            triggerRefetch={triggerRefetch}
            data={data}
            filtersData={filtersData}
            view="icons"
            filteredData={filteredData}
            selected={selected}
            setSelected={setSelected}
        />
    ) : (
        <TableRows
            data={data}
            filteredData={filteredData}
            view="table"
            filtersData={filtersData}
            triggerRefetch={triggerRefetch}
            selected={selected}
            setSelected={setSelected}
        />
    )
}
