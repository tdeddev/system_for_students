import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
export const useUsersStore = defineStore('user', {
    state: () => ({
        list: []
    }),
    actions: {
        async getMember (){
            await axios.get("http://localhost:5555/api/getmember").then((response) => {
                return this.list = response.data
            })
        }
    }
})
