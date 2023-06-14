import { defineConfig } from "astro/config"
import astroI18next from "astro-i18next"
import preact from "@astrojs/preact"

// https://astro.build/config
export default defineConfig({
    integrations: [astroI18next(), preact({ compat: true })],
})
