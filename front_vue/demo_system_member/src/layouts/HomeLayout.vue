<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="container mx-auto mt-6 flex justify-center">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">YOUR NAME COMPANY</RouterLink>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink :to="{name : 'login'}">เข้าสู่ระบบ</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{name : 'home'}">หน้าหลัก</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Main Content -->
    <slot></slot>

    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by YOUR NAME COMPANY</p>
      </aside>
    </footer>
</template>