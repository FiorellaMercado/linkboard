const express = require('express')
require('dotenv').config()
const {prisma} = require('./config/bd')
const cors = require('cors')
const {connectDB} = require('./config/bd')

const linkRoutes = require('./routes/linkRoutes')
const tagRoutes = require('./routes/tagRoutes')
const commentRoutes = require('./routes/commentRoutes')

const app = express()

app.use(express.json())

app.use(cors())

app.get('/health', async(req,res)=>{
    const total= await prisma.link.count()
    res.json({total})
})

app.use('/api', tagRoutes )
app.use('/api/enlaces/:id/comentarios', commentRoutes)
app.use('/api/enlaces', linkRoutes)

app.use((req,res)=>{
    res.status(404).json({error:'Pagina no encontrada'})
})

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).json({error:"Error interno del servidor"})

})

const PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor en http://localhost:${PORT}`)
    })
})
