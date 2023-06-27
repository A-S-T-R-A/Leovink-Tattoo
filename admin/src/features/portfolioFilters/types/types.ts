export interface IFilters {
    artist: string[]
    [key: string]: string[]
}

export interface IFiltersData {
    filters: IFilters
    reset: string
}
