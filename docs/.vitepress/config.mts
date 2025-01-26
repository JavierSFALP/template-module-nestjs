import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "nestjs-release-base",
  description: "A nestjs project that implements husky, commitizen, semantic release and vipress. So it can be used as the generic base for future projects validating code, comments and automatizing changelog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-conf
    nav: [
      { text: 'Home', link: '/' },
    ],
  }
})
