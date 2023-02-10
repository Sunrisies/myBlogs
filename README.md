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

- vue-router 路由

```
pnpm i -S vue-router@4
参考官网: https://router.vuejs.org/


```

- pinia 数据共享

```
pnpm i pinia
按照官网走: https://pinia.vuejs.org/


pinia永久储存
第一步安装: pnpm i pinia-plugin-persistedstate
第二步: 修改store文件夹下面的index.ts

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 状态持久化-插件配置
pinia.use(
  createPersistedState({
    serializer: {
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  })
)

export default pinia

第三步,在使用的地方加入 persist里面的内容
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useStore = defineStore('login', {
  state: () => ({ count: 0 }),
  persist: {
    // 自定义持久化方式
    storage: window.localStorage,
    // 刷新之后触发
    beforeRestore: (context) => {
      console.log('Before', context)
    },
    afterRestore: (context) => {
      console.log('After', context)
    }
  },

  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment(n: number) {
      this.count += n
    }
  }
})

```

- 网络请求 axios

```
pnpm i axios
按照官网来: https://axios-http.com/

```

- ts
