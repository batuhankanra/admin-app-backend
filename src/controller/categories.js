import Enum from "../config/Enum.js";
import AuditLogs from "../lib/auditLogs.js";
import CustomError from "../lib/error.js";
import Response from "../lib/Response.js";
import categoriesSchema from "../models/categories.schema.js";



export const cView= async (req, res) => {
    try {
        const categories = await categoriesSchema.find();
        res.status(Enum.HTTP_CODES.OK).json(Response.successResponse(categories));
    } catch (error) {
        let errorRes=Response.errorResponse(error)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const cAdd=async (req,res)=>{
    try{
        const {name}=req.body
        if(!name){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"VALIDATION ERROR","Name is required")
        }
        const category=new categoriesSchema({
            name,
            is_active:true,
            created_by:req.user._id
        })
        await category.save()
         AuditLogs.info(req.user.email,'categories',"add",{category})
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))
    }catch(error){
        let errorRes=Response.errorResponse(error)
        return res.status(errorRes.code).json(errorRes)
    }
}

export const cUpdate=async (req,res)=>{
    try{
        let {id,name,is_active}=req.body
        if(!id){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"VALIDATION ERROR","Id is required")
        }
        const updates={}
        if(name){
           updates.name=name 
        }
        if(typeof is_active==="boolean"){
            updates.is_active=is_active
        }
        await categoriesSchema.updateOne({_id:id},updates)
        AuditLogs.info(req.user.email,'categories',"update",{updates})

        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))
    }catch(error){
        let errorRes=Response.errorResponse(error)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const cDelete=async (req,res)=>{
    try{
        let {id}=req.body
        if(!id){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"VALIDATION ERROR","Id is required")
        }
        let deleteCategory=await categoriesSchema.deleteOne({_id:id})
        AuditLogs.info(req.user.email,'categories',"delete",{deleteCategory})
        
        
        if(deleteCategory.deletedCount===0){
            throw new CustomError(Enum.HTTP_CODES.NOT_FOUND,"NOT FOUND","Category not found")
        }
        
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))
    }catch (error){
        let errorRes=Response.errorResponse(error)
        return res.status(errorRes.code).json(errorRes)
    }
}