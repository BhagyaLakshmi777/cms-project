import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {loginAdmin} from "../models/authModel.js";

const SECRET="cmssecretkey";

export const login=(req,res)=>{

    const {username,password}=req.body;

    loginAdmin(username,(err,user)=>{

        if(err){
            return res.status(500).json({error:err.message});
        }

        if(!user){
            return res.status(401).json({
                message:"Invalid Username"
            });
        }

        const match=bcrypt.compareSync(password,user.password);

        if(!match){
            return res.status(401).json({
                message:"Invalid Password"
            });
        }

        const token=jwt.sign(
            {
                id:user.id,
                username:user.username
            },
            SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.json({
            message:"Login Successful",
            token
        });

    });

};

export const logout=(req,res)=>{
    res.json({
        message:"Logout Successful"
    });
};
