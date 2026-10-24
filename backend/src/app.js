const express = require('express')
require('dotenv').config()
const {prisma} = require('./config/bd')
const cors = require('cors')
const {connectDB} = require('./config/bd')

const app = express()

app.use(express.json())

app.use(cors())

app.get('/health', async(req,res)=>{
    const total= await prisma.link.count()
    res.json({total})
})


const PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor en http://localhost:${PORT}`)
    })
})
