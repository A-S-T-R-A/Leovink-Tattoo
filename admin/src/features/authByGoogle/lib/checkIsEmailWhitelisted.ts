import { emailsWhitelist } from "../const/emailsWhitelist"

export function checkIsEmailWhitelisted(email?: string | null): boolean {
    if (!email) return false
    return emailsWhitelist.includes(email)
}
