import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Spawnable Docs',
  description: 'Documentation for Spawnable services',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Spawnable.io', link: 'https://spawnable.io' }],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started.md' },
        ],
      },
      {
        text: 'SDKs',
        items: [{ text: 'MML for Javascript', link: '/sdks/mml-js.md' }],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/SpawnableIo' },
      { icon: 'github', link: 'https://github.com/SpawnableHQ' },
    ],
  },
})
