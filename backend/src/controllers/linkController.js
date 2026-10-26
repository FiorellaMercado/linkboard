const {prisma} = require('../config/bd')
const { isValidString, isValidURL, isValidTags, normalizeTags, isValidId } = require('../utils/validators')

const listLinks= async (req,res) => {
    const links= await prisma.link.findMany()
    res.json(links)
}

const createLink = async (req,res) => {
    const enlace=req.body.url
    const titulo= req.body.title
    const descripcion = req.body.description
    const tags = req.body.tags
    
    if (!isValidURL(enlace) || !isValidString(titulo,2,150)){
        return res.status(400).json({error:"Datos invalidos"})
    }

    const datos={url: enlace, title: titulo}

    if (isValidString(descripcion,2,500)){
        datos['description']=descripcion
    }

    const connectList = []
    if (tags!==undefined){
        if(isValidTags(tags)){
            const taglist = normalizeTags(tags)
            if(!taglist){
                return res.status(400).json({error:'Etiqueta invalida'})
            }
            for(const tag of taglist){

                connectList.push({
                    create:{name:tag}, 
                    where:{name:tag}
                })
                
            }

            datos['tags']={connectOrCreate:connectList};
        }else{
            return res.status(400).json({error:'tags debe ser una lista'})
        }
    }
    



    const link = await prisma.link.create({data: datos, include:{tags:true}})
    res.status(201).json(link)
    

}

const linkDetail = async (req,res) => {
    const id = req.params.id

    if (!isValidId(id)){
        return res.status(400).json({error: "ID invalido"})
    }

    const link = await prisma.link.findUnique({where:{id:Number(id)}, include:{tags:true, comments:true}})
    if(!link){
        return res.status(404).json({error: "Enlace no encontrado"})
    }
    res.status(200).json(link)

}

const voteLink= async (req,res) => {

    const id = req.params.id
    
    if (!isValidId(id)){
        return res.status(400).json({error: "ID invalido"})
    }

    const voto = Number(req.body?.vote)

    if (voto!==1 && voto!==-1){
        return res.status(400).json({error: "voto invalido"})
    }
    const link = await prisma.link.findUnique({where:{id:Number(id)}})
    if(!link){
        return res.status(404).json({error: "Enlace no encontrado"})       
    }
    if (link.votes===0 && voto===-1){
        return res.status(422).json({error: "Accion no permitida. No se puede descontar voto"})              
    }
    const votoCalculo= Number(link.votes)+voto
    const linkActualizado = await prisma.link.update({where:{id:Number(id)}, data:{votes:votoCalculo}})
    res.status(200).json(linkActualizado)
}

module.exports={listLinks, createLink, linkDetail,voteLink}