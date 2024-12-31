import Enum from "../config/Enum.js"
import CustomError from "../lib/error.js"
import Response from "../lib/Response.js"
import roleSchema from "../models/role.schema.js"
import rolePrivlegesSchema from "../models/rolePrivleges.schema.js"
import AuditLogs from "../lib/auditLogs.js";



export const rView=async (req,res)=>{
    try{
        const role=await roleSchema.find().lean()
        for(let i=0;i<role.length;i++){
            let permissions=await rolePrivlegesSchema.find({role_id:role[i]._id}).lean()
            role[i].permissions=permissions
        }

        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse(role))
    }catch (err){

        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const rAdd=async (req,res)=>{
    try{
        let {role_name,permissions,is_active}=req.body
        if(!role_name ){
            throw new CustomError(Enum.HTTP_CODES.NOT_FOUND,"NOT FOUND","role not found")

        }
        if(!Array.isArray(permissions) || permissions.length===0){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"VALIDATION ERROR","permissions is required")
        }
        if(typeof is_active!=="boolean"){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"VALIDATION ERROR","is_active is required")
        }
        const role=new roleSchema({
            role_name,
            is_active,
            created_by:req.user?._id
        })
        await role.save()
        for(let i=0; i<permissions.length;i++){
            const rolePriv=new rolePrivlegesSchema({
                role_id:role._id,
                permissions:permissions[i],
                is_active
            })
            rolePriv.save()
        }
        AuditLogs.info(req.user._id,"Role","Add",role)
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))

    }catch (err){

        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const rUpdate=async (req,res)=>{
    try{
        let {id,role_name,permissions,is_active}=req.body
        if(!id){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"NOT FOUND","id not found")
        }
        let role=await roleSchema.findOne({_id:id}).lean()
        let updates={}
        if(role_name){
            updates.role_name=role_name
        }
        if(is_active){
            updates.is_active=is_active
        }
        if(Array.isArray(permissions) || permissions.length>0){
            let per=await rolePrivlegesSchema.find({role_id:role._id}).lean()
            let removedPer=per.filter(p=>!permissions.includes(p.permissions))
            let existingPermissions = per.map(p => p.permissions);
            let invalidPer=permissions.filter(p=>!existingPermissions.includes(p))
            if(removedPer.length>0){
                await rolePrivlegesSchema.deleteMany({_id:{$in:removedPer.map(p=>p._id)}})
            }
            if(invalidPer.length>0){
                for(let i=0;i<invalidPer.length;i++){
                    const rolePriv=new rolePrivlegesSchema({
                        role_id:id,
                        permissions:invalidPer[i],
                        created_by:req.user?._id
                    })
                    rolePriv.save()
                }
            }
        }

        await roleSchema.updateOne({_id:id},updates)
        AuditLogs.info(req.user._id,"Role","Update",updates)

        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))
    }catch (err){

        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}
export const rDelete=async (req,res)=>{
    try{
        let {id}=req.body
        if(!id){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"NOT FOUND","id not found")
        }
        await roleSchema.deleteOne({_id:id})
        await rolePrivlegesSchema.deleteMany({role_id:id})
        AuditLogs.info(req.user._id,"Role","delete",roleSchema)
        
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({success:true}))

    }catch (err){

        let errorRes=Response.errorResponse(err)
        return res.status(errorRes.code).json(errorRes)
    }
}