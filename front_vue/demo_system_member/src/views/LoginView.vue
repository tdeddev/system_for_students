<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
let username = ref('')
let password = ref('')
let textHeader = 'เข้าสู่ระบบ'
let btn_submit = 'เข้าสู่ระบบ'
let btn_close = 'สมัครสมาชิก'
onBeforeMount(() => {
  if(route.fullPath === '/register'){
    textHeader = 'สมัครสมาชิก'
    btn_submit = 'ยืนยัน'
    btn_close = 'กลับ'
  }
})

const loginMember = () => {
  if(username.value == 'admin' && password.value == '123456'){
    router.push({name : 'dashboard'})
  }
  
}
</script>

<template>
  <div class="container mx-auto mt-6 flex justify-center">
    <div class="card w-2/4 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex justify-center">{{ textHeader }}</h2>
        <div class="flex justify-center">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">ยูสเซอร์สมาชิก</span>
            </div>
            <input 
            type="text" 
            placeholder="username" 
            class="input input-bordered w-full max-w-xs" 
            v-model="username"
            />
          </label>
        </div>
        <div class="flex justify-center">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">รหัสผ่านสมาชิก</span>
            </div>
            <input
             type="password" 
             placeholder="******" 
             class="input input-bordered w-full max-w-xs" 
             v-model="password"
             />
          </label>
        </div>
        <div class="card-actions justify-center mt-3">
          <button class="btn btn-primary" @click="loginMember">{{ btn_submit }}</button>
          <a v-if="route.fullPath === '/register'" href="/login">
            <button class="btn btn-ghost">{{ btn_close }}</button>
          </a>
          <a v-else href="/register">
            <button class="btn btn-ghost">{{ btn_close }}</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
