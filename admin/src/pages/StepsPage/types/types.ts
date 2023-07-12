export interface IStepsData {
    img: string
    title: string
    description: string
}

export interface ITranslatedStepsData {
    en: IStepsData[]
    ro: IStepsData[]
    ru: IStepsData[]
}
