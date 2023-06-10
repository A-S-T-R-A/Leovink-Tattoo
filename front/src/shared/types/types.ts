export interface ITattooImage {
    id: number
    img: string
    artist: string
    style: string
    color: string
}

interface IFaqQuestion {
    id: number
    question: string
    answer: string
}

export interface IFaqBlock {
    id: number
    title: string
    questions: IFaqQuestion[]
}

export type DeviceType = "mobile" | "tablet" | "laptop" | "desktop" | "desktop4K"
