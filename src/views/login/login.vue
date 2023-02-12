<template>
  <div class="d w-full h-full box-border flex justify-center flex-col items-center">
    <div class="v w-64">
      <h1 class="text-3xl font-bold border-rose-600 text-center pb-2">欢迎登入</h1>
      <n-form ref="formRef" :model="formValue" :rules="rules" size="small" class="form">
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formValue.email" placeholder="输入邮箱" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formValue.password" placeholder="输入密码" />
        </n-form-item>
      </n-form>
      <div class="flex justify-around pt-5">
        <n-button attr-type="button" @click="handleLogInToClick"> 登入 </n-button>
        <n-button attr-type="button" @click="handleRegisteredClick"> 注册 </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/login'
import { login } from '@/api/index'
import { FormInst } from 'naive-ui'
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
const handleLogInToClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const { data } = await login('login', { email: 'admin', password: '123456' })
      message.success(data?.message)
      localStorage.setItem('token', '123456789')
      router.push({ name: '/' })
    } else {
      message.error('Invalid')
    }
  })
}
const handleRegisteredClick = () => {
  message.error('该功能还没有完善')
}
</script>

<style lang="less" scoped>
.d {
  background-image: url('../../assets/背景图.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .form {
    .n-form-item.n-form-item--top-labelled {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
  }
}
</style>
