import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
// const BASE_URL = "https://dead-pear-barnacle-tam.cyclic.app/"
const BASE_URL = "http://localhost:5555/"
export const useUsersStore = defineStore('user', {
    state: () => ({
        list: [],
        response : '',
        profile : {}
    }),
    actions: {
        async getMember (){
            await axios.get(`${BASE_URL}api/member/get_member`).then((response) => {
                return this.list = response.data.data
            })
        },
        async addTime(refIndex){

        },
        async changeHwid(refIndex){

        },
        async createMember(FormData){
            let response = await axios.post(`${BASE_URL}api/member/create_member`, FormData)
            if(response.data.code === 0){
                this.response = response.data.msg
            }
        },
        async loginMember(FormLogin){
            let response = await axios.post(`${BASE_URL}api/member/login`, FormLogin)
            if(response.data.code === 0){
                this.response = response.data.data.msg
                this.profile = response.data.data
            }else{
                this.response = response.data.msg
            }
        }
    }
})
