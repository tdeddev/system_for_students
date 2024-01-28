<script setup>
import { RouterLink } from 'vue-router';

const menus = [
    {
        name : 'จัดการสมาชิก',
        routeName : 'dashboard'
    },
    {
        name : 'ออกจากระบบ',
        routeName : 'login'
    }
]
</script>

<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <slot></slot>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li class="text-3xl font-bold">
                    <a>Admin Backoffice</a>
                </li>
                <!-- Sidebar content here -->
                <li v-for="menu in menus"
                class="font-bold">
                <RouterLink :to="{name : menu.routeName}">{{ menu.name }}</RouterLink></li>
            </ul>
        </div>
    </div>
</template>