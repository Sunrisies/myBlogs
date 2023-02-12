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

- eslint

```
pnpm i -D eslint
npx eslint --init


? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
  ---------------------------------------------------------------- 选择强制代码风格
√ How would you like to use ESLint? · style
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
  ------------------------------------------------------------选择语言模块
? Which framework does your project use? ...
  React
> Vue.js
  None of these
  ------------------------------------------------------------选择语言框架
? Does your project use TypeScript? » No / Yes
  --------------------------------------------是否使用ts (视自己情况而定,我这里不用选No)
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
  -----------------------------------------------代码在哪里运行 (用空格选中 Browser+Node)
? How would you like to define a style for your project? ...
  Use a popular style guide
> Answer questions about your style
  -----------------------------------------------用过A&Q来配置规则
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
  ----------------------------------------------配置文件使用js文件
? What style of indentation do you use? ...
> Tabs
  Spaces
  ----------------------------------------------缩进方式
? What quotes do you use for strings? ...
  Double
> Single
  -----------------------------------------------字符串用什么引号
? What line endings do you use? ...
> Unix
  Windows
  ---------------------------------------------------
? Do you require semicolons? » No / Yes
  ---------------------------------------------------是否需要分号(视自己情况而定,我这里不用选No)
? Would you like to install them now? » No / Yes
  ---------------------------------------------------选择yes现在立即初始化配置文件
? Which package manager do you want to use? ...
> npm
  yarn
  pnpm
  ------------------------------------------------包管理器选择npm


生成一个文件.eslintrc.cjs

// 说明: 该包是用于配置vite运行的时候自动检测eslint规范 不符合页面会报错
pnpm i -D vite-plugin-eslint
pnpm i -D @babel/core
pnpm i -D @babel/eslint-parser

配置vite.config.js
import eslintPlugin from 'vite-plugin-eslint';
plugins: [
  eslintPlugin({
    include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
  }),
],

```

.eslintrc.cjs 配置文件

```
module.exports = {
  root: true,
  // 运行环境
  env: {
    browser: true,
    es2021: true,
    node: true // node 环境
  },

  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  extends: ['standard', 'plugin:vue/vue3-essential'],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-absolute-path': 'off',
    'comma-dangle': 'off', //  数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    camelcase: 'off', // 强制使用骆驼拼写法命名约定
    'no-redeclare': 'off', // 禁止使用 var 多次声明同一变量
    'vue/no-unused-components': 'off',
    'space-before-function-paren': 0, // 强制在 function的左括号之前使用一致的空格
    'no-mutating-props': 0,
    'no-undef': 'off',
    'vue/multi-word-component-names': 0,
    // 缩进
    indent: ['off', 2],
    // 使用类型安全的 === 和 !== 操作符代替 == 和 != 除null以外
    eqeqeq: [2, 'always', { null: 'ignore' }]
  }
}

```

.eslintignore 配置 eslint 忽略文件

```
# 忽略public目录下文件的语法检查
public
# 忽略node_modules目录下文件的语法检查
node_modules
# 忽略src/assets目录下文件的语法检查
src/assets
# 忽略dist目录下文件的语法检查
dist


```

在 package.json 文件添加"lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src"

```
 "lint": "eslint --ext .js,.vue --ignore-path .eslintignore --fix src"
```
