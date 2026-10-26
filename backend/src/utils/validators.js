function isValidId(id) {
    if (!id || !Number.isInteger(Number(id))){
        return false
    }
    return true
}

function isValidString(parameter, minlength, maxlength){
    if (typeof parameter!== "string"){
        return false
    }
    const param = parameter.trim()
    if (!param || param.length>maxlength || param.length<minlength ){
        return false
    }
    return true
}

function isValidURL(url){
    if (!isValidString(url,0,2048)){
        return false
    }

    try{
        const link = new URL(url.trim())
        if (link.protocol !== "https:"){
            return false
        }
    }catch{
        return false
    }
    return true
}

function isValidTags(lista){
    if(!Array.isArray(lista)){
        return false
    }
    return true
}

function normalizeTags(tags){
    const lista = []
    for (const tag of tags){
        if(isValidString(tag,1,60)){
            lista.push(tag.trim().toLowerCase())
        }else{
            return null
        }
    }
    const listaNormalizada= [...new Set(lista)];
    return listaNormalizada
}



module.exports={isValidId, isValidString, isValidURL, isValidTags, normalizeTags}