export interface IFilterItem {
    key: string
    label: {
        en: string
        ro: string
        ru: string
    }
}

export interface IFilter {
    id: number
    title: { en: string; ro: string; ru: string }
    items: IFilterItem[]
}

export interface IFiltersData {
    filters: IFilter[]
    reset: { en: string; ro: string; ru: string }
}

export interface IGlobalData {
    filtersData: IFiltersData
}

export interface INewFilter {
    en: string
    ro: string
    ru: string
}
