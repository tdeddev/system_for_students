import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
const BASE_URL = "https://dead-pear-barnacle-tam.cyclic.app/"
export const useUsersStore = defineStore('user', {
    state: () => ({
        list: []
    }),
    actions: {
        async getMember (){
            await axios.get(`${BASE_URL}api/getmember`).then((response) => {
                return this.list = response.data
            })
        },
        async addTime(refIndex){

        },
        async changeHwid(refIndex){

        },
        async createMember(){

        },
        async loginMember(){
            
        }
    }
})
