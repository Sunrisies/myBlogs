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
	/**
	 *  默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。
	 *  ESLint一旦发现配置文件中有   "root": true，它就会停止在父级目录中寻找。
	*/
	root: true,
	// 运行环境
	'env': {
		'browser': true,
		'es2021': true,
		'node': true  // node 环境
	},
	// 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'vue'
	],
	/**
		下面这些rules是用来设置从插件来的规范代码的规则
        "off" 或 0   - 关闭规则
        "warn" 或 1  - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
        "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    */
	'rules': {
		// vue组件使用多单词命名
        'vue/multi-word-component-names': [
            2,
            {
                ignores: ['index'] //需要忽略的组件名
            }
        ],
        // 设置每行最大属性数
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 10, // 标签为单行时，每行最大属性数值为 10，默认值为 1
                multiline: {
                    max: 1 // 标签为多行时，每行最大属性数字为 1，默认值为 1
                }
            }
        ],
        // 在单行元素的内容之前和之后需要换行符
        'vue/singleline-html-element-content-newline': 0,
        // 在多行元素的内容之前和之后需要换行符
        'vue/multiline-html-element-content-newline': 0,
        // 组件 name 属性值必须使用帕斯卡命名法（单词首字母大写）
        'vue/name-property-casing': [0, 'PascalCase'],
        // 禁止使用 v-html 来防止 XSS 攻击
        'vue/no-v-html': 0,
        // 定义对象的set存取器属性时，强制定义get
        'accessor-pairs': 2,
        // 强制箭头函数的箭头前后使用一致的空格
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 禁止或强制在单行代码块中使用空格
        'block-spacing': [2, 'always'],
        // 强制在代码块中使用一致的大括号风格
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        // 强制使用骆驼拼写法命名约定
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        //  数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
        'comma-dangle': [2, 'never'],
        // 控制逗号前后的空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        'comma-style': [2, 'last'],
        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        'constructor-super': 2,
        // 强制所有控制语句使用一致的括号风格
        curly: [2, 'multi-line'],
        // 强制object.key 中 . 的位置，参数:
        // property，'.'号应与属性在同一行
        // object, '.' 号应与对象名在同一行
        'dot-location': [2, 'property'],
        // 文件末尾强制换行
        'eol-last': 2,
        // 使用类型安全的 === 和 !== 操作符代替 == 和 != 除null以外
        eqeqeq: [2, 'always', { null: 'ignore' }],
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 要求回调函数中有容错处理
        'handle-callback-err': [2, '^(err|error)$'],
        // 强制使用一致的缩进
        indent: [
            2,
            {
                SwitchCase: 1
            }
        ],
        // 强制在 JSX 属性中一致地使用双引号或单引号
        'jsx-quotes': [2, 'prefer-single'],
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 强制在关键字前后使用一致的空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 要求构造函数首字母大写
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        // 要求调用无参构造函数时有圆括号
        'new-parens': 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 0,
        // 禁止使用 Array 构造函数
        'no-array-constructor': 2,
        // 禁用 arguments.caller 或 arguments.callee
        'no-caller': 2,
        // 禁用 console
        'no-console': 0,
        // 禁止修改类声明的变量
        'no-class-assign': 2,
        // 禁止条件表达式中出现赋值操作符
        'no-cond-assign': 2,
        // 禁止修改 const 声明的变量
        'no-const-assign': 2,
        // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
        'no-control-regex': 0,
        // 禁止删除变量
        'no-delete-var': 2,
        // 禁止 function 定义中出现重名参数
        'no-dupe-args': 2,
        // 禁止类成员中出现重复的名称
        'no-dupe-class-members': 2,
        // 禁止对象字面量中出现重复的 key
        'no-dupe-keys': 2,
        // 禁止重复的 case 标签
        'no-duplicate-case': 2,
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        'no-empty-character-class': 2,
        // 禁止使用空解构模式no-empty-pattern
        'no-empty-pattern': 2,
        // 禁用 eval()
        'no-eval': 2,
        // 禁止对 catch 子句的参数重新赋值
        'no-ex-assign': 2,
        // 禁止扩展原生类型
        'no-extend-native': 2,
        // 禁止不必要的 .bind() 调用
        'no-extra-bind': 2,
        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 2,
        // 禁止不必要的括号 //(a * b) + c;//报错
        'no-extra-parens': [2, 'functions'],
        // 禁止 case 语句落空
        'no-fallthrough': 2,
        // 禁止数字字面量中使用前导和末尾小数点
        'no-floating-decimal': 2,
        // 禁止对 function 声明重新赋值
        'no-func-assign': 2,
        // 禁止使用类似 eval() 的方法
        'no-implied-eval': 2,
        // 禁止在嵌套的块中出现 function 或 var 声明
        'no-inner-declarations': [2, 'functions'],
        // 禁止 RegExp 构造函数中无效的正则表达式字符串
        'no-invalid-regexp': 2,
        // 禁止在字符串和注释之外不规则的空白
        'no-irregular-whitespace': 2,
        // 禁用 __iterator__ 属性
        'no-iterator': 2,
        // 不允许标签与变量同名
        'no-label-var': 2,
        // 禁用标签语句
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        // 禁用不必要的嵌套块
        'no-lone-blocks': 2,
        // 不允许空格和 tab 混合缩进
        'no-mixed-spaces-and-tabs': 2,
        // 禁止使用多个空格
        'no-multi-spaces': 2,
        // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
        'no-multi-str': 2,
        // 不允许多个空行
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        // 禁止对原生对象赋值
        'no-native-reassign': 2,
        // 禁止在 in 表达式中出现否定的左操作数
        'no-negated-in-lhs': 2,
        // 禁止使用 Object 的构造函数
        'no-new-object': 2,
        // 禁止调用 require 时使用 new 操作符
        'no-new-require': 2,
        // 禁止 Symbol 的构造函数
        'no-new-symbol': 2,
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        'no-new-wrappers': 2,
        // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
        'no-obj-calls': 2,
        // 禁用八进制字面量
        'no-octal': 2,
        // 禁止在字符串中使用八进制转义序列
        'no-octal-escape': 2,
        // 禁止对 __dirname 和 __filename进行字符串连接
        'no-path-concat': 2,
        // 禁用 __proto__ 属性
        'no-proto': 2,
        // 禁止使用 var 多次声明同一变量
        'no-redeclare': 2,
        // 禁止正则表达式字面量中出现多个空格
        'no-regex-spaces': 2,
        // 禁止在返回语句中赋值
        'no-return-assign': [2, 'except-parens'],
        // 禁止自我赋值
        'no-self-assign': 2,
        // 禁止自身比较
        'no-self-compare': 2,
        // 禁用逗号操作符
        'no-sequences': 2,
        // 禁止覆盖受限制的标识符
        'no-shadow-restricted-names': 2,
        // 禁止 function 标识符和括号之间出现空格
        'no-spaced-func': 2,
        // 禁用稀疏数组
        'no-sparse-arrays': 2,
        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-this-before-super': 2,
        // 禁止抛出非异常字面量
        'no-throw-literal': 2,
        // 禁用行尾空格
        'no-trailing-spaces': 2,
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef': 2,
        // 禁止将变量初始化为 undefined
        'no-undef-init': 2,
        // 禁止出现令人困惑的多行表达式
        'no-unexpected-multiline': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        // 禁止出现未使用过的变量
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        // 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 2,
        // 禁止不必要的计算性能键对象的文字
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        // 禁用不必要的转义字符
        'no-useless-escape': 0,
        // 禁止属性前有空白
        'no-whitespace-before-property': 2,
        // 禁用 with 语句
        'no-with': 2,
        // 强制函数中的变量要么一起声明要么分开声明
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        // 强制操作符使用一致的换行符
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        // 要求或禁止块内填充
        'padded-blocks': [2, 'never'],
        // 强制使用一致的反勾号、双引号或单引号
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        semi: [2, 'never'],
        // 强制分号之前和之后使用一致的空格
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 强制在块之前使用一致的空格
        'space-before-blocks': [2, 'always'],
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': [2, 'never'],
        // 强制在圆括号内使用一致的空格
        'space-in-parens': [2, 'never'],
        // 要求操作符周围有空格
        'space-infix-ops': 2,
        // 强制在一元操作符前后使用一致的空格
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }
        ],
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'template-curly-spacing': [2, 'never'],
        // 要求使用 isNaN() 检查 NaN
        'use-isnan': 2,
        // typeof foo === "undefimed" 错误
        'valid-typeof': 2,
        // 要求 IIFE 使用括号括起来
        'wrap-iife': [2, 'any'],
        // 强制在 yield* 表达式中 * 周围使用空格
        'yield-star-spacing': [2, 'both'],
        // 要求或禁止 “Yoda” 条件
        yoda: [2, 'never'],
        // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-const': 2,
        // 是否允许debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 强制在花括号中使用一致的空格
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: false
            }
        ],
        // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'never']
	}
};
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
