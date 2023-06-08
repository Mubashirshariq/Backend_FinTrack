const jwt=require("jsonwebtoken");

const generateToken=id=>{
    return jwt.sign({id},"anykey",{expiresIn:"10d"});
};

module.exports=generateToken;