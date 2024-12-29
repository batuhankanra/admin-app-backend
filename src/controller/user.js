import Enum from "../config/Enum.js"
import CustomError from "../lib/error.js";
import Response from "../lib/Response.js"
import User from "../models/user.schema.js"
import bcrypt from "bcryptjs";
import is from "is_js";
import roleSchema from "../models/role.schema.js";

export const uView=async (req,res)=>{
    try{
        let user=await User.find({},{password:0}).populate({
            path:'role_id',
            select:'role_name'
        }).lean()
       
        
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse(user))
    }catch(err){

        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const uAdd=async (req,res)=>{
    try{
        let { email,password,id }=req.body
        if(!email || is.not.email(email)){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid Email")
        }
        if(!password || is.not.string(password) || password.length<Enum.PASS_LENGTH){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid Password")
        }
        let passwordHash= bcrypt.hashSync(password,bcrypt.genSaltSync(8),null)
        let roleFind=await roleSchema.findOne({_id:id})
        if(roleFind===0){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid Role")
        }
        let newUser =new User({
            email,
            password:passwordHash,
            is_active:true,
            role_id:id
        })
        await newUser.save()
        

        return res.status(Enum.HTTP_CODES.CREATED).json(Response.successResponse({success:true}))


    }catch (err){
        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const uUpdate=async (req,res)=>{
    try{
        let {id,email,password,first_name,last_name,phone,is_active,role_id}=req.body
        let updates={}
        if(!id || is.not.string(id)){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid ID")
        }
        if(is_active || is.boolean(is_active)){
            updates.is_active=is_active
        }
        if(email || is.email(email)){
            updates.email=email
        }
        if(password || is.string(password) || password?.length>Enum.PASS_LENGTH){
            let passwordHash= bcrypt.hashSync(password,bcrypt.genSaltSync(8),null)
            updates.password=passwordHash
            
        }
        if(first_name || is.string(first_name)){
            updates.first_name=first_name
        }
        if(last_name || is.string(last_name)){
            updates.last_name=last_name
        }
        if(phone || is.string(phone)){
            updates.phone=phone
        }
        if(role_id || is.string(role_id)){
            let roleFind=await roleSchema.findOne({_id:role_id})
            if(roleFind===0){
                throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid Role")
            }
            updates.role_id=role_id
        }
        await User.updateOne({_id:id},updates)
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))

    }catch(err){
        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const uDelete=async (req,res)=>{
    try{
        let {id}=req.body
        if(!id || is.not.string(id)){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error","Invalid ID")
        }
        await User.deleteOne({_id:id})
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))
    }catch(err){
        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}