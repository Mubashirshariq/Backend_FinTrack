const getTokenFromHeader=(req)=>{
   const headerObj = req.headers; // Use req.headers instead of req.header
   const token = headerObj["authorization"].split(" ")[1];
    if(token!==undefined) return token;

    else{
        return{
            status:'failed',
            message:'there is no token attached to header'
        }
    }
}

module.exports=getTokenFromHeader;