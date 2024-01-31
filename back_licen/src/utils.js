const utils = {}
const bcrypt = require('bcrypt')
const md5 = require('js-md5')
const dayjs = require('dayjs')
const moment = require('moment')
const momentTz = require('moment-timezone')

utils.md5Convert = (pass) => {
    try {
        let passConvert = md5(pass)
        return passConvert
    } catch (error) {
        console.log(error)
    }
}

utils.res_to_front = (data, code, msg) => {
    let res = {
        code : code || 0,
        msg : msg || 'success',
        data : data || {}
    }
    return res;
}

utils.now = () => {
    return momentTz().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
}


module.exports = utils;