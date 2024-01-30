const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/get_member', async(req, res) => {
    const results = await db.query('select * from member')
    res.json(results[0])
})

router.post('/create_member', (req, res) => {
    res.send(req.body)
})

module.exports = router