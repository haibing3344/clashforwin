// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://clashforwin.bid',
	output: 'server',
	adapter: cloudflare(),
	integrations: [
		starlight({			
			title: 'Clash for Windows',
            locales: {
                root: {
                  label: '简体中文',
                  lang: 'zh-CN',
                },
            },
			social: [{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/jichang360' }],
			logo: {
				src: './src/assets/logo.png',
				alt: 'Clash for Windows',
			},
			sidebar: [
				{
					label: '🎉机场推荐',
					badge: '推荐',
					slug: 'feed',
				},
				{
					label: '介绍',
					slug: 'about',
				},
				{
					label: '下载',
					slug: 'download',
				},
				{
					label: '教程',
					slug: 'tutorial',
				},
				{
					label: 'Wiki',
					autogenerate: { directory: 'wiki' },
				},
				{
					label: '常见问题',
					slug: 'faq',
				},
			],
		}),
	],
});
