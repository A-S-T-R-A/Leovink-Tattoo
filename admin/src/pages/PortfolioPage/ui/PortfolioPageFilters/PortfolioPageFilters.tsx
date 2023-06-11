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
    setFilters: (val: any) => void
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

    console.log(filters)

    return (
        <div className={styles.container}>
            <Dropdown
                options={tattooLiveDropdownOptions}
                firstOptionText="Published and Unpublished"
                value={filters.isLive}
                onChange={isLive => setFilters((prev: IFiltersData) => ({ ...prev, isLive }))}
            />
            <Dropdown
                options={artistOptions}
                firstOptionText="All artists"
                value={filters.artist as string}
                onChange={artist => setFilters((prev: IFiltersData) => ({ ...prev, artist }))}
            />
            <Dropdown
                options={styleOptions}
                firstOptionText="All styles"
                value={filters.style as string}
                onChange={style => setFilters((prev: IFiltersData) => ({ ...prev, style }))}
            />
            <Dropdown
                options={colorOptions}
                firstOptionText="All colors"
                value={filters.color as string}
                onChange={color => setFilters((prev: IFiltersData) => ({ ...prev, color }))}
            />
            <button
                onClick={() => {
                    setFilters({
                        artist: "",
                        style: "",
                        color: "",
                        isLive: "",
                    })
                }}
            >
                Reset Filters
            </button>
        </div>
    )
}
