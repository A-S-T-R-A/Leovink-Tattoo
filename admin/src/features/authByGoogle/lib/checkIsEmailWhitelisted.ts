import { emailsWhitelist } from "../const/emailsWhitelist"

export function checkIsEmailWhitelisted(email?: string | null): boolean {
    if (!email) return false

    const result = Object.values(emailsWhitelist)
        .flatMap(item => item)
        .includes(email)

    return result
}
