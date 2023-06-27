import { Dropdown } from "shared/ui/Dropdown"
import styles from "./PortfolioPageFilters.module.scss"
import { tattooLiveDropdownOptions } from "pages/PortfolioPage/const/filtersData"
import { useMemo } from "react"
import { IFiltersData } from "features/portfolioFilters/types/types"

interface IPortfolioPageFilters {
    filters: IFiltersData | null
    setFilters: (val: any) => void
    filtersData: any | null
    resetFilters: () => void
}

export function PortfolioPageFilters({
    filters,
    setFilters,
    filtersData,
    resetFilters,
}: IPortfolioPageFilters) {
    const dropdownOptions = useMemo(() => {
        const options = []
        for (const key in filtersData) {
            const otherOptions = filtersData[key].map(item => ({ label: item, value: item }))
            const option = {
                name: key,
                options: [{ label: `No ${key}`, value: "Unassigned" }, ...otherOptions],
            }
            options.push(option)
        }
        return options
    }, [filtersData])

    if (!filters) return null

    return (
        <div className={styles.container}>
            <Dropdown
                options={tattooLiveDropdownOptions}
                firstOptionText="Published and Unpublished"
                value={filters.isLive}
                onChange={value => setFilters((prev: IFiltersData) => ({ ...prev, isLive: value }))}
            />
            {dropdownOptions.map((item, index) => {
                const { name, options } = item

                return (
                    <Dropdown
                        key={index}
                        options={options}
                        firstOptionText={`All ${name}s`}
                        value={filters[name] as string}
                        onChange={value =>
                            setFilters((prev: IFiltersData) => ({ ...prev, [name]: value }))
                        }
                    />
                )
            })}

            <button onClick={resetFilters}>Reset Filters</button>
        </div>
    )
}
