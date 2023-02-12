<template>
  <h1 class="text-3xl font-bold underline border-rose-600">Hello world!</h1>
  <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-button type="primary"> Primary </n-button>
    <n-button type="info"> Info </n-button>
    <n-button type="success"> Success </n-button>
    <n-button type="warning" @click="handleGoTo('home')"> home </n-button>
    <n-button type="error" @click="handleGoTo('login')"> login </n-button>
  </n-space>
  <div>你好啊,欢迎进入🐷空间</div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<script setup lang="ts">
const router = useRouter()

const handleGoTo = (s: string) => {
  router.push({ name: s })
}
</script>
<style scoped lang="less"></style>
