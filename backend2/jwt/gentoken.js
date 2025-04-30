import jwt from "jsonwebtoken"  

const createToken = (userId, res)=>{
    const token = jwt.sign({userId},process.env.JWT_token,{
        expiresIn:"5d"
    });
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    });
     
}
export default createToken;