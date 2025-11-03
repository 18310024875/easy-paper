import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

const IS_PROD = process.env.NODE_ENV == 'production'
const IS_SEE = process.env.npm_config_see

const config = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "widgets": path.resolve(__dirname, 'widgets')
    }
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    viteExternalsPlugin({
      vue: 'Vue'
    })
  ],
}

if (IS_PROD) {
  config.build = {
    // ‘es’: ES 模块，适合现代浏览器和支持 ES 模块的 Node.js 环境。
    // ‘cjs’: CommonJS 模块，主要用于 Node.js。
    // ‘umd’: 通用模块定义，可在浏览器和 Node.js 中使用，适合通过 <script> 标签加载。
    // ‘iife’: 立即执行函数表达式，适合浏览器脚本，执行后立即可用。
    lib: {
      entry: path.resolve(__dirname, 'custom-widgets', 'index.js'),
      formats: ['system'],
      fileName: 'widgets'
    },
    rollupOptions: {
      plugins: [],
      external: [],
      output: {
        // entryFileNames: '[name].[format].js'
      }
    },
    minify: false,
    emptyOutDir: true
  }
}

if (IS_SEE) {
  config.build.rollupOptions.plugins.push(visualizer({
    open: true
  }))
}

export default defineConfig(config)

// 暂时无法控制提取公共包 只能一个一个打
// import { sync } from 'glob'
// const entry = {}
// const paths = sync('./widgets/**/index.js')
// paths.map(path => {
//   let name = path.split(/[\\|\/]/)?.[1]
//   if (name) entry[name] = path
// })
