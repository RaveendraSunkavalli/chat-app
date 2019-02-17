const moment=require('moment'); 
var getMessage=(from,text)=>{
    return {
        from,
        text,
        createdAt:moment().valueOf()
    }
}

var getLocationMessage=(from,lat,lng)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        createdAt:moment().valueOf()
    }
}

module.exports={
    getMessage,
    getLocationMessage
}