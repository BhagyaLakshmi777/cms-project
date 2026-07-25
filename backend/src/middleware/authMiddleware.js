import jwt from "jsonwebtoken";

const SECRET="cmssecretkey";

export const verifyToken=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Token Missing"
        });
    }

    try{

        const decoded=jwt.verify(token,SECRET);

        req.user=decoded;

        next();

    }catch(error){

        res.status(401).json({
            message:"Invalid Token"
        });

    }

};