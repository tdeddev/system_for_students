<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '../stores/users'
import Swal from 'sweetalert2'
const userStore = useUsersStore()
const router = useRouter()
const route = useRoute()
let username = ref('')
let password = ref('')
let hwid = ref('')
let game = ref('')
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

const loginMember = async () => {
  let formLogin = {
    username : username.value,
    password : password.value
  }
  await userStore.loginMember(formLogin)
  if(userStore.profile.role){
    router.push({name : 'dashboard', query : {role : userStore.profile.role}})
    Swal.fire({
      title: 'เข้าสู่ระบบสำเร็จ!',
      text : userStore.response,
      icon : 'success',
      confirmButtonText: 'ปิด'
    })
  }else{
    Swal.fire({
      title: 'เข้าสู่ระบบไม่สำเร็จ!',
      text : userStore.response,
      icon : 'error',
      confirmButtonText: 'ปิด'
    })
  }
}

const register = async () => {
  let objMember = {
    username : username.value,
    password : password.value,
    hwid : hwid.value,
    game : game.value
  }
  await userStore.createMember(objMember)
  if(userStore.response){
    Swal.fire({
        title: 'สำเร็จ!',
        text: userStore.response,
        icon: 'success',
        confirmButtonText: 'ปิด'
    })
    router.push({name : 'login'})
    username.value = ''
    password.value = ''
    btn_close = 'สมัครสมาชิก'
    btn_submit = 'เข้าสู่ระบบ'
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
              <span class="label-text">รหัสผ่าน</span>
            </div>
            <input
             type="password" 
             placeholder="******" 
             class="input input-bordered w-full max-w-xs"
             maxlength="12"
             v-model="password"
             />
          </label>
        </div>
        <div class="flex justify-center" v-if="route.fullPath === '/register'">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">เลขประจำเครื่องสมาชิก</span>
            </div>
            <input
             type="text" 
             placeholder="6EDFEBF9C0909E3FBFF" 
             class="input input-bordered w-full max-w-xs"
             maxlength="19"
             v-model="hwid"
             />
          </label>
        </div>
        <div class="flex justify-center" v-if="route.fullPath === '/register'">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">เกมส์ที่ต้องการสมัคร</span>
            </div>
            <select class="select select-bordered w-full max-w-xs" v-model="game">
              <option disabled selected>กรุณาเลือกเกมส์</option>
              <option value="CIS">Carrieverse</option>
              <option value="All">ทุกเกมส์</option>
            </select>
          </label>
        </div>
        <div class="card-actions justify-center mt-3">
          <button v-if="route.fullPath === '/register'" class="btn btn-primary" @click="register">{{ btn_submit }}</button>
          <button v-else class="btn btn-primary" @click="loginMember">{{ btn_submit }}</button>
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
