export interface IQuestion {
    question: string
    answer: string
}

export interface IFaqData {
    title: string
    questions: IQuestion[]
}

export interface ITranslatedFaqData {
    en: IFaqData[]
    ro: IFaqData[]
    ru: IFaqData[]
}
