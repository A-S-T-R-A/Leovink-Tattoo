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

export interface INewAllTitlesData {
    en: string
    ro: string
    ru: string
}

export interface INewAllQuestionData {
    en: IQuestion
    ro: IQuestion
    ru: IQuestion
}
