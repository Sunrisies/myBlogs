<template>
  <div class="d">
    <h1 class="text-3xl font-bold underline border-rose-600">Hello world!</h1>
    <n-form ref="formRef" :model="formValue" :rules="rules" size="small" class="form">
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="formValue.email" placeholder="输入邮箱" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formValue.password" placeholder="输入密码" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick"> 验证 </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/login'
import { login } from '@/api/index'
const store = useStore()
const router = useRouter()

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  email: 'admin',
  password: '123456'
})
const rules = {
  email: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入年龄',
    trigger: ['input', 'blur']
  }
}
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { data } = await login('login', { email: 'admin', password: '123456' })
      console.log(store)
      message.success(data?.message)
      // store.increment('小朱')
      localStorage.setItem('token', '123456789')
      router.push({ name: '/' })
    } else {
      console.log(errors)
      // message.error('Invalid')
    }
  })
}
</script>

<style lang="less" scoped>
.d {
  width: 100%;
  height: 100%;
  background: pink;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  .form {
    width: 250pxs;
    .n-form-item.n-form-item--top-labelled {
      display: flex;
    }
  }
}
</style>
