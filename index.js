const express = require('express')
const app = express()
const router = require('./router/auth-router')
const port = 5000
const connectDb = require('./utils/db')
const cors = require('cors')
var cookieParser = require('cookie-parser')




app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use("/api/auth",router)

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})