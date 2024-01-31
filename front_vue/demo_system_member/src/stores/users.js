import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
// const BASE_URL = "https://dead-pear-barnacle-tam.cyclic.app/"
const BASE_URL = "http://localhost:3333/"
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
        async loadUser (){
            let refId = localStorage.getItem('id')
            if(refId){
                await axios.get(`${BASE_URL}api/member/get_member/${refId}`).then((response) => {
                    this.profile = response.data.data[0]
                })
            }
        },
        async addTime(refIndex, day){
            let formUpdate = {
                days : day
            }
            try {
                let response = await axios.put(`${BASE_URL}api/member/update_member/${refIndex}`, formUpdate)
                if(response.data.code == 0){
                    this.response = `${response.data.msg} ใช้งานได้ถึง : ${response.data.data.expirydate}`
                }else{
                    this.response = response.data.msg
                }
            } catch (error) {
                this.response = error.msg
            }
        },
        async changeHwid(refIndex, hwid){
            let formUpdate = {
                hwid : hwid
            }
            try {
                let response = await axios.put(`${BASE_URL}api/member/update_member/${refIndex}`, formUpdate)
                if(response.data.code == 0){
                    this.response = `HWID : ${response.data.data.hwid}`
                }else{
                    this.response = response.data.msg
                }
            } catch (error) {
                this.response = error.msg
            }
        },
        async changePass(refIndex, pass){
            let formUpdate = {
                password : pass
            }
            try {
                let response = await axios.put(`${BASE_URL}api/member/update_member/${refIndex}`, formUpdate)
                if(response.data.code == 0){
                    this.response = `Password : ${pass}`
                }else{
                    this.response = response.data.msg
                }
            } catch (error) {
                this.response = error.msg
            }
        },
        async createMember(FormData){
            try {
                let response = await axios.post(`${BASE_URL}api/member/create_member`, FormData)
                if(response.data.code == 0){
                    this.response = response.data.msg
                }else{
                    this.response = response.data.msg
                }
                
            } catch (error) {
                this.response = error.msg
            }
        },
        async loginMember(FormLogin){
            try {
                let response = await axios.post(`${BASE_URL}api/member/login`, FormLogin)
                if(response.data.code == 0){
                    this.response = response.data.data.msg
                    this.profile = response.data.data
                    if(this.profile.role == 'member'){
                        localStorage.setItem('id', this.profile.id)
                    }
                }else{
                    this.response = response.data.msg
                }
                
            } catch (error) {
                this.response = error.msg
            }
        }
    }
})
