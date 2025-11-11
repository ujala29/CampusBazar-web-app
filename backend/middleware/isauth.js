import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.one_cart;
        if(!token){
            return res.status(401).json({message:"Unauthorized,no token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userID=decoded.userID;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({message:"Unauthorized,invalid token"});
    }       
}
export default isAuth;