const { prisma } = require("../config/bd")
const { isValidId } = require("../utils/validators")

const listTags = async (req,res) => {
    const id = req.params.id
    
    if (!isValidId(id)){
        return res.status(400).json({error: "ID invalido"})
    }

    const link = await prisma.link.findUnique({
        where: {id:Number(id)},
        include: {tags:true}})
    if(!link){
        return res.status(404).json({error:"Enlace no encontrado"})
    }

    res.status(200).json(link.tags)

}

const listAllTags= async (req,res) => {
    const tags= await prisma.tag.findMany()
    res.status(200).json(tags)
}



module.exports={listTags, listAllTags}