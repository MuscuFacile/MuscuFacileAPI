module.exports =(element)=>{
    if(Array.isArray(element)){
        for(let i =0 ; i<element.length;i++){
            if(isNaN(element[i])){
                return false;
            }
        }
        
    }else{
        if(isNaN(element)){
            return false;
        }     
    }
    return true;
}