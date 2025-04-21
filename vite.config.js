import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  	plugins: [vue()],
  	// 为 ./src 提供别名 @
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	base: './', // 确保资源使用相对路径
	// 主动开启热更新
	server: {
		hmr: true
	}
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `@import "@/styles/global.scss";`
	// 		}
	// 	}
	// }
})
