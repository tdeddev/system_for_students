const express = require('express');
const router = express.Router();
const db = require('../database')
const utils = require('../src/utils');
const dayjs = require('dayjs');
let dateNow = utils.now()
const moment = require('moment')
const momentTz = require('moment-timezone')
router.get('/get_member', async(req, res) => {
    const results = await db.query('select * from member')
    res.json(utils.res_to_front(results[0]))
})

router.post('/create_member', async (req, res) => {
    try {
        let r = req.body
        let obj = {}
        let results_dup = await db.query('select username from member where username = ? limit 1', r.username)
        let member_dup = results_dup[0]
        if(member_dup[0]){
            if(member_dup[0].username == r.username.toLowerCase()){
                obj = utils.res_to_front(member_dup[0].username,"100","มี Username นี้ในระบบแล้ว")
                res.json(obj)
                return
            }
        }
        let FormMember = {
            username : r.username.toLowerCase(),
            password : utils.md5Convert(r.password),
            game : r.game,
            hwid : r.hwid
        }
        if(r.username && r.password){
            const results = await db.query('INSERT INTO member SET ?', FormMember)
            obj = utils.res_to_front(results[0],0,`ยูสเซอร์ : ${FormMember.username} สมัครสมาชิกสำเร็จ`)
            res.json(obj)
        }
    } catch (error) {
        res.json(utils.res_to_front([],100,'สมัครสมาชิกไม่สำเร็จ'))
    }
})

router.put('/update_member/:id', async (req, res) => {
    try {
        let r = req.body
        let id = req.params.id
        let obj = {}
        let expirydate = await db.query('SELECT * FROM member WHERE id = ?', id)
        if(r.hwid){
            obj.hwid = r.hwid
        }
        if(r.password){
            obj.password = utils.md5Convert(r.password)
        }
        if(r.days){
            if(dateNow > expirydate[0][0].expirydate){
                obj.expirydate = momentTz().tz("Asia/Bangkok").add(r.days, 'days').format("YYYY-MM-DD HH:mm:ss")
            }else{
                obj.expirydate = momentTz(expirydate[0][0].expirydate).tz("Asia/Bangkok").add(r.days, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
        }
        let results = await db.query('UPDATE member SET ? WHERE id = ?', [obj, id])
        res.json(utils.res_to_front(obj,'0',"อัพเดทสำเร็จ!"))
    } catch (error) {
        res.json(utils.res_to_front([],100,'อัพเดทข้อมูลไม่สำเร็จ'))
    }
})

router.post('/login', async (req, res) => {
    try {
        let r = req.body
        let obj = {}
        if(r.username && r.password){
            let dataLogin = {
                username : r.username.toLowerCase(),
                password : utils.md5Convert(r.password)
            }
            const results = await db.query('SELECT * FROM member WHERE username = ? AND password = ?', [dataLogin.username, dataLogin.password])
            if(results[0].length > 0){
                obj = utils.res_to_front(results[0][0])
                res.json(obj)
            }else{
                res.json(utils.res_to_front([],100,'กรุณาตรวจสอบ ยูสเซอร์ หรือ พาสเวิร์ด'))
            }
        }

    } catch (error) {
        res.json(utils.res_to_front([],100,'ล๊อคอินไม่สำเร็จ!!'))
    }
})

router.post('/login_bot', async (req, res) => {
    try {
        let r = req.body
        if(r.hwid){
            const results = await db.query('SELECT * FROM member WHERE hwid = ? AND game = ?', [r.hwid, r.game])
            if(results[0].length > 0){
                if(results[0][0].expirydate > dateNow){
                    obj = utils.res_to_front(results[0][0])
                    res.json(results[0][0])
                }else{
                    res.json(utils.res_to_front([],100,'กรุณาต่ออายุการใช้งาน'))
                }
            }else{
                res.json(utils.res_to_front([],100,'กรุณาตรวจสอบ ยูสเซอร์ หรือ พาสเวิร์ด'))
            }
        }

    } catch (error) {
        res.json(utils.res_to_front([],100,'ล๊อคอินไม่สำเร็จ!!'))
    }
})



module.exports = router