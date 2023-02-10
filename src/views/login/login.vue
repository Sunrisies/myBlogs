<template>
  <div>登入页面{{ count }}</div>
  <div>双倍{{ double }}</div>
  <n-button @click="handleAdd">Default</n-button>
  <n-button @click="handleAxios">请求</n-button>
</template>

<script setup lang="ts">
import { useStore } from '@/store/login'
import instance from '@/utils/http'
const store = useStore()

let { count, double } = storeToRefs(store)

const handleAdd = () => {
  console.log(store)
  store.increment(2)
}
const handleAxios = () => {
  instance.get('').then((res) => {
    console.log(res)
  })
}
</script>

<style lang="less" scoped></style>
