if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
} 
  
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const cors = require('cors')
const router = require('./routes')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.use(router)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})