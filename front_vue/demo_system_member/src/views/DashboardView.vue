<script setup>
import { onMounted, ref } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue'
import { useUsersStore } from '../stores/users'
import Swal from 'sweetalert2'
let days = ref(30)
let hwid = ref('')
let newHwid = ref('')
let game = ref('')
let userStore = useUsersStore()
let username = ref('')
let expirydate = ref(0)
onMounted(() => {
    userStore.getMember()
})

const selectedUser = (ref) => {
    username.value = userStore.list[ref].username
    expirydate.value = userStore.list[ref].expirydate
    game.value = userStore.list[ref].game
    hwid.value = userStore.list[ref].hwid
}

const updateUser = () => {
    Swal.fire({
        title: 'สำเร็จ!',
        text: 'ใช้งานได้ถึง dd:mm:yyyy hh:mm:ss',
        icon: 'success',
        confirmButtonText: 'ปิด'
    })
}
const updateUserHwid = () => {
    Swal.fire({
        title: 'สำเร็จ!',
        text: 'อัพเดท HWID สำเร็จ!',
        icon: 'success',
        confirmButtonText: 'ปิด'
    })
}
</script>

<template>
    <AdminLayout>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>ยูสเซอร์สมาชิก</th>
                        <th>เกมส์</th>
                        <th>เลขประจำเครื่อง</th>
                        <th>วันหมดอายุ</th>
                        <th>สถานะการใช้งาน</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(member, index) in userStore.list" :key="index">
                        <th>{{ index+1 }}</th>
                        <td>{{ member.username }}</td>
                        <td>{{ member.game }}</td>
                        <td>{{ member.hwid }} 
                            <button class="btn btn-sm mx-3" onclick=my_modal_2.showModal() @click="selectedUser(index)">
                                <span class="material-symbols-outlined">
                                    cached
                                </span>
                            </button>
                        </td>
                        <td>{{ member.expirydate }}</td>
                        <td class="badge mt-4" :class="member.status == 1 ? 'badge-success' : 'badge-error'">{{ member.status == 1 ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}</td>
                        <td>
                            <div class="flex gap-4">
                                <button class="btn btn-info btn-sm" onclick=my_modal_1.showModal() @click="selectedUser(index)">ต่ออายุ</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-3">สมาชิก {{ username }}</h3>
                <div class="mb-3">
                    ใช้งานได้ถึง : {{ expirydate }} <br>
                    เกมส์ : {{ game }}
                </div>
                <input 
                type="number" 
                placeholder="username" 
                class="input input-bordered input-sm w-16" 
                v-model="days"
                />
                <span class="mx-3 text-1xl">Days</span>
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <div class="flex gap-4">
                        <button class="btn btn-success text-white" @click="updateUser">บันทึก</button>
                        <button class="btn">ปิด</button>
                    </div>
                </form>
                </div>
            </div>
        </dialog>
        <dialog id="my_modal_2" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-3">สมาชิก {{ username }} | HWID : {{ hwid }}</h3>
                <input 
                type="text" 
                placeholder="HWID (เลขประจำเครื่อง)" 
                class="input input-bordered input-sm w-1/2" 
                v-model="newHwid"
                />
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <div class="flex gap-4">
                        <button class="btn btn-success text-white" @click="updateUserHwid">บันทึก</button>
                        <button class="btn">ปิด</button>
                    </div>
                </form>
                </div>
            </div>
        </dialog>
    </AdminLayout>
</template>