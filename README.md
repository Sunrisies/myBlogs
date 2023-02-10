# VUE3 + VITE4 + naive-ui + pinia + axios + tailwind.css + vue-router + vueuse + ts

- 组件库 naive-ui
  网站 'https://www.naiveui.com/zh-CN/os-theme/'

```
pnpm i -D naive-ui
pnpm i -D vfonts

自动引入
pnpm i -D unplugin-vue-components
pnpm i -D unplugin-auto-import

在vite.config.ts中添加
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

AutoImport({
  imports: [
    'vue',
    {
      'naive-ui': [
        'useDialog',
        'useMessage',
        'useNotification',
        'useLoadingBar'
      ]
    }
  ]
}),
Components({
  resolvers: [NaiveUiResolver()]
})

```

- css 库 tailwindcss
  网站 "https://tailwindcss.com/"

```
第一步
pnpm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p // 执行完整个命令会出现一个tailwind.config.cjs的文件

第二步 在tailwind.config.cjs文件中进行修改
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
第三步: 在src下面创建一个css文件，在里面写入
@tailwind base;
@tailwind components;
@tailwind utilities;
第四步: 在main.ts中引入该文件

第五步: naive-ui跟tailwindcss 有冲突,需要在tailwind.config.js写
// 今天晚上回去改 2023年2月10
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

安装 css 预处理语言 less
pnpm i -D less less-loader
```

- pinia 数据共享

- vue-router 路由

- 网络请求 axios

- ts
