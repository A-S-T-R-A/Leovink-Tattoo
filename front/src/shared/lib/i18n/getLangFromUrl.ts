import type { LanguageType } from "shared/types/types"

export function getLangFromUrl(url: URL): LanguageType {
    const [, lang] = url.pathname.split("/")

    if (lang === "ru") return "ru"
    if (lang === "ro") return "ro"

    return "en"
}
