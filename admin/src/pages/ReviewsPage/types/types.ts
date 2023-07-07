export interface ITestimonialData {
    title: string
    description: string
    artist: string
    duration: string
    preview: string
    video: string
}

export interface ITranslatedTestimonialsData {
    en: ITestimonialData[]
    ro: ITestimonialData[]
    ru: ITestimonialData[]
}

export interface INewAllData {
    en: ITestimonialData
    ro: ITestimonialData
    ru: ITestimonialData
}
