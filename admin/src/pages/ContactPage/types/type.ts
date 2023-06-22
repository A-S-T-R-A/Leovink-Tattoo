export interface ISocialMedia {
    icon: string
    link: string
}

export interface IContactData {
    location: string
    phone: string
    mail: string
    description: string
    socials: ISocialMedia[]
}
