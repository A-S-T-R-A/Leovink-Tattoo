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

export interface IOtherData {
    filtersData: IFiltersData
}

/* export interface ITranslatedOtherData {
    en: IOtherData
    ro: IOtherData
    ru: IOtherData
}

export interface INewFilter {
    en: string
    ro: string
    ru: string
} */
