import { useMemo } from "react"
import { Dropdown } from "shared/ui/Dropdown"
import styles from "./PortfolioPageFilters.module.scss"
import { tattooLiveDropdownOptions } from "../../const/const"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"

interface IPortfolioPageFilters {
    filters: { [key: string]: string } | null
    setFilters: (val: any) => void
    filtersData: IFilter[]
    resetFilters: () => void
}

export function PortfolioPageFilters({
    filters,
    setFilters,
    filtersData,
    resetFilters,
}: IPortfolioPageFilters) {
    const dropdownOptions = useMemo(() => {
        return filtersData?.map(item => ({
            name: item.title[defaultLanguage],
            options: item.items.map(innerItem => ({
                label: innerItem.label[defaultLanguage],
                value: innerItem.key,
            })),
        }))
    }, [filtersData])

    if (!filters) return null

    return (
        <div className={styles.container}>
            <Dropdown
                options={tattooLiveDropdownOptions}
                firstOptionText="Published and Unpublished"
                value={filters.isLive}
                onChange={value => setFilters((prev: any) => ({ ...prev, isLive: value }))}
            />
            {dropdownOptions?.map((item, index) => {
                const { name, options } = item

                return (
                    <Dropdown
                        key={index}
                        options={options}
                        firstOptionText={`All ${name}`}
                        value={filters[name] as string}
                        onChange={value => setFilters((prev: any) => ({ ...prev, [name]: value }))}
                    />
                )
            })}

            <button onClick={resetFilters}>Reset Filters</button>
        </div>
    )
}
