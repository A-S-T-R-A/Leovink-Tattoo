import { defineConfig } from "astro/config"
/* import astroI18next from "astro-i18next"
 */ import preact from "@astrojs/preact"

import netlify from "@astrojs/netlify/functions"

// https://astro.build/config
export default defineConfig({
    integrations: [preact()],
    output: "server",
    adapter: netlify(),
})
