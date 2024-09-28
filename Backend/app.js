const express = require('express')
const app = express()
const dotenv= require("dotenv")
const path = require('path')
const env = require("process")
const cors = require('cors')
dotenv.config({path:path.join(__dirname,"config","config.env")})
app.use(express.json())
app.use(cors())

const connectdatabase=require('./config/connectdatabase')
connectdatabase()

const router= require('./router')
app.use("/api/v1",router)


app.listen(process.env.PORT,()=>{
    console.log(`server listening to ${process.env.PORT} in ${process.env.NODE_ENV}`);
    
})