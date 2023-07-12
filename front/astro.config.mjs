import { defineConfig } from "astro/config"
/* import astroI18next from "astro-i18next"
 */
import preact from "@astrojs/preact"
/* import netlify from "@astrojs/netlify/functions";
 */
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
    integrations: [preact()],
    output: "server",
    adapter: vercel(),
})
