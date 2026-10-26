const { prisma } = require("../config/bd")
const { isValidId, isValidString } = require("../utils/validators")

const listComments = async (req,res) => {
    const id = req.params.id
    if(!isValidId(id)){
        return res.status(400).json({error:"ID inválida"});
    }

    const link= await prisma.link.findUnique({
        where: {id: Number(id)},
        include:{comments:true}
    })
    if (!link){
        return res.status(404).json({error:"enlace no encontrado"});
    }
    res.status(200).json(link.comments)
}   
const createComment=async (req,res) => {
    const id = req.params.id
    const texto = req.body.text
    const autor = req.body.author

    if(!isValidId(id)){
        return res.status(400).json({error: "ID invalido"})
    }

    if (!isValidString(texto,2,500) || !isValidString(autor,2,60)){
        return res.status(400).json({error: "datos invalidos"})     
    }
    const link = await prisma.link.findUnique({where:{id:Number(id)}})
    if(!link){
        return res.status(404).json({error: "Enlace no encontrado"})
    }
    const comentario= await prisma.comment.create({data:{text:texto,author:autor,linkId:Number(id)}})
    res.status(201).json(comentario)


}

module.exports= {listComments, createComment}