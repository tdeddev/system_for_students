const express = require('express')
const app = express()
const port = 5555
const cors = require('cors')
const bodyparser = require('body-parser')
const memberRouter = require('./router/member')

app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.use('/api/member', memberRouter)


app.listen(port,() => {
    console.log(`app listening on port ${port}`)
})