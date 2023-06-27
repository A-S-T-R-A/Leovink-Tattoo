export interface IFilters {
    artists: { key: string; label: string }[]
    [key: string]: { key: string; label: string }[]
}

export interface IFiltersData {
    filters: IFilters
    reset: string
}

export interface IOtherData {
    filtersData: IFiltersData
}

export interface INewFilter {
    en: string
    ro: string
    ru: string
}
