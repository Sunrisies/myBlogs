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
