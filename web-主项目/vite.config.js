import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig(({ mode }) => {
  console.log(`-------------------------BUILD_TYPE=${mode}-------------------------`)

  const config = {
    base: './',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          index: 'index.html',
          design: 'design.html',
          preview: 'preview.html',
          login: 'login.html'
        }
      }
    },
    define: {
      'process.env': process.env
    },
    plugins: [
      vue(),
      vueJsx(),
      viteExternalsPlugin({
        vue: 'Vue'
      })
    ],
    resolve: {
      alias: {
        "common": path.resolve(__dirname, 'src-common'),
        "@public-ui": path.resolve(__dirname, '@public-ui')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          globalVars: {}
        },
      },
    },
    server: {
      host: '0.0.0.0',
      fs: {
        exclude: ['dist']
      },
      proxy: {
        '/api': {
          target: `http://127.0.0.1:3000`,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
        '/public-api': {
          target: `http://127.0.0.1:3000`,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
        '/static': {
          target: `http://127.0.0.1:3000`,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
        '/mobileBoard': {
          // target: `http://10.28.21.100:9580`, // 测试
          target: 'http://10.28.23.240:9580', //正式
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mobileBoard/, '')
        },
      },
    }
  }

  if (process.env.npm_config_see) {
    config.plugins.push(visualizer({
      open: true
    }))
  }

  return config
})