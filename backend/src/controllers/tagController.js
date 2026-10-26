const { prisma } = require("../config/bd")
const { isValidId, normalizeTags } = require("../utils/validators")

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

const createTags = async (req, res) => {
    const id = Number(req.params.id)

    if(!Number.isInteger(id) || id<1){
        return res.status(400).json({error:"ID invalido"})
    }

    if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
        return res.status(400).json({error:"body invalido"})       
    }
    const tags = req.body.tags
    if(!Array.isArray(tags) || tags.length<1){
        return res.status(400).json({error:"tags debe ser un array"})       
    }
    if(tags.length>10){
        return res.status(400).json({error:"Array muy largo, maximo 10 tags"})       
    }

    const lista = normalizeTags(tags) 
    if(!lista){
        return res.status(400).json({error:"Etiqueta invalida"})       
    }
    
    const connectList = []

    for (const tag of lista){
        connectList.push({
            where:{name:tag},
            create:{name:tag}
        })
    }
    
    const link= await prisma.link.findUnique({where:{id:id}})

    if(!link){
        return res.status(404).json({error:"Enlace no encontrado"})              
    }
    const linkActualizado = await prisma.link.update({
        where:{id:id},
        data:{
            tags:{
                connectOrCreate: connectList
            }  
        },
        include:{tags:true}
    })

    res.status(200).json(linkActualizado)

}


module.exports={listTags, listAllTags, createTags}