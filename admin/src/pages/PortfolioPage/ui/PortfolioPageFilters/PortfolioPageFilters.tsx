import { Dropdown } from "shared/ui/Dropdown"
import styles from "./PortfolioPageFilters.module.scss"
import {
    tattooArtistsDropdownOptions,
    tattooColorsDropdownOptions,
    tattooStylesDropdownOptions,
} from "shared/const/filters"
import { tattooLiveDropdownOptions } from "pages/PortfolioPage/const/filtersData"
import { IFiltersData } from "pages/PortfolioPage/types/types"

interface IPortfolioPageFilters {
    filters: IFiltersData
    setFilters: (val: IFiltersData) => void
}

export function PortfolioPageFilters({ filters, setFilters }: IPortfolioPageFilters) {
    const artistOptions = [
        { label: "No artist", value: "Unassigned" },
        ...tattooArtistsDropdownOptions,
    ]

    const styleOptions = [
        { label: "No style", value: "Unassigned" },
        ...tattooStylesDropdownOptions,
    ]

    const colorOptions = [
        { label: "No color", value: "Unassigned" },
        ...tattooColorsDropdownOptions,
    ]

    return (
        <div className={styles.container}>
            <Dropdown
                options={tattooLiveDropdownOptions}
                firstOptionText="Published and Unpublished"
                value={filters.isLive}
                onChange={isLive => setFilters(prev => ({ ...prev, isLive }))}
            />
            <Dropdown
                options={artistOptions}
                firstOptionText="All artists"
                value={filters.artist}
                onChange={artist => setFilters(prev => ({ ...prev, artist }))}
            />
            <Dropdown
                options={styleOptions}
                firstOptionText="All styles"
                value={filters.style}
                onChange={style => setFilters(prev => ({ ...prev, style }))}
            />
            <Dropdown
                options={colorOptions}
                firstOptionText="All colors"
                value={filters.color}
                onChange={color => setFilters(prev => ({ ...prev, color }))}
            />
        </div>
    )
}
