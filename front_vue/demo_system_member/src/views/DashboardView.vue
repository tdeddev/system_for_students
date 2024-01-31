<script setup>
import { onMounted, ref } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue'
import MemberLayout from '../layouts/MemberLayout.vue'
import { useUsersStore } from '../stores/users'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router';
let days = ref(30)
let hwid = ref('')
let newHwid = ref('')
let game = ref('')
let userStore = useUsersStore()
let username = ref('')
let expirydate = ref(0)
let route = useRoute()
let newPass = ref('')
let selectedIndex = ref('')
onMounted(() => {
    if(userStore.profile.role === 'admin'){
        userStore.getMember();
    }else{
        userStore.loadUser();
    }
})

const clearData = () => {
    days.value = 30
    newHwid.value = ''
}

const selectedUser = (ref) => {
    username.value = userStore.list[ref].username
    expirydate.value = userStore.list[ref].expirydate
    game.value = userStore.list[ref].game
    hwid.value = userStore.list[ref].hwid
    selectedIndex.value = userStore.list[ref].id
}

const user_Update = async (ref) => {
    await userStore.changeHwid(ref, newHwid.value)
    if(userStore.response){
            Swal.fire({
                title: 'แก้ไข HWID สำเร็จ!',
                text: userStore.response,
                icon: 'success',
                confirmButtonText: 'ปิด'
            })
        }else{
            Swal.fire({
                title: 'แก้ไข HWID ไม่สำเร็จ',
                text: userStore.response,
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }
        userStore.loadUser();
        clearData();
}

const pass_Update = async (ref) => {
    await userStore.changePass(ref, newPass.value)
    if(userStore.response){
            Swal.fire({
                title: 'แก้ไขรหัสผ่าน สำเร็จ!',
                text: userStore.response,
                icon: 'success',
                confirmButtonText: 'ปิด'
            })
        }else{
            Swal.fire({
                title: 'แก้ไขรหัสผ่าน ไม่สำเร็จ',
                text: userStore.response,
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }
        userStore.loadUser();
        clearData();
}

const updateUser = async () => {
    if(days.value && !newHwid.value){
        await userStore.addTime(selectedIndex.value, days.value)
        if(userStore.response){
            Swal.fire({
                title: 'เติมเวลาสำเร็จ!',
                text: userStore.response,
                icon: 'success',
                confirmButtonText: 'ปิด'
            })
        }else{
            Swal.fire({
                title: 'เติมเวลาไม่สำเร็จ',
                text: userStore.response,
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }
        userStore.getMember();
        clearData();
    }else if(newHwid.value){
        await userStore.changeHwid(selectedIndex.value, newHwid.value)
        if(userStore.response){
            Swal.fire({
                title: 'แก้ไข HWID สำเร็จ!',
                text: userStore.response,
                icon: 'success',
                confirmButtonText: 'ปิด'
            })
        }else{
            Swal.fire({
                title: 'แก้ไข HWID ไม่สำเร็จ',
                text: userStore.response,
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }
        userStore.getMember();
        clearData();
    }
}
// const updateUserHwid = () => {
//     Swal.fire({
//         title: 'สำเร็จ!',
//         text: 'อัพเดท HWID สำเร็จ!',
//         icon: 'success',
//         confirmButtonText: 'ปิด'
//     })
// }
</script>

<template>
    <AdminLayout v-if="userStore.profile.role === 'admin'">
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
                        <th>{{ index + 1 }}</th>
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
                        <td class="badge mt-4" :class="member.status == 1 ? 'badge-success' : 'badge-error'">{{
                            member.status == 1 ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}</td>
                        <td>
                            <div class="flex gap-4">
                                <button class="btn btn-info btn-sm" onclick=my_modal_1.showModal()
                                    @click="selectedUser(index)">ต่ออายุ</button>
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
                <input type="number" placeholder="username" class="input input-bordered input-sm w-16" v-model="days" />
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
                <input type="text" placeholder="HWID (เลขประจำเครื่อง)" class="input input-bordered input-sm w-1/2"
                    v-model="newHwid" maxlength="19" />
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
    </AdminLayout>
    <MemberLayout v-else>
        <div class="container w-1/2 mx-auto mt-4">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>User INFO</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr>
                        <th>ยูสเซอร์</th>
                        <td>{{ userStore.profile.username }}</td>
                    </tr>
                    <tr>
                        <th>พาสเวิร์ด</th>
                        <td>************ </td>
                        <td>
                            <button class="btn btn-neutral btn-sm mt-1 ms-3" onclick=my_modal_1.showModal()>แก้ไข</button>
                        </td>
                    </tr>
                    <tr>
                        <th>เกมส์</th>
                        <td>CIS</td>
                    </tr>
                    <tr>
                        <th>HWID</th>
                        <td>{{ userStore.profile.hwid }} </td>
                        <td>
                            <button class="btn btn-neutral btn-sm mt-1 ms-3" onclick=my_modal_2.showModal()>แก้ไข</button>
                        </td>
                    </tr>
                    <tr>
                        <th>วันหมดอายุ</th>
                        <td>{{ userStore.profile.expirydate }}</td>
                    </tr>
                </tbody>
            </table>
            <dialog id="my_modal_2" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg mb-3">แก้ไข HWID</h3>
                    <input type="text" placeholder="HWID (เลขประจำเครื่อง)" class="input input-bordered input-sm w-1/2"
                        v-model="newHwid" maxlength="19" />
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <div class="flex gap-4">
                                <button class="btn btn-success text-white" @click="user_Update(userStore.profile.id)">บันทึก</button>
                                <button class="btn">ปิด</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg mb-3">แก้ไข รหัสผ่าน</h3>
                    <input type="text" placeholder="new password" class="input input-bordered input-sm w-1/2"
                        v-model="newPass" maxlength="12" />
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <div class="flex gap-4">
                                <button class="btn btn-success text-white" @click="pass_Update(userStore.profile.id)">บันทึก</button>
                                <button class="btn">ปิด</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </MemberLayout>
</template>