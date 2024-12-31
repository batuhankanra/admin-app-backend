import Enum from "../config/Enum.js"
import Response from "../lib/Response.js"
import auditLogsSchema from "../models/auditLogs.schema.js"
import moment from "moment"



export const aLView=async(req,res)=>{
    try{
        const {begin_date,end_date}=req.body
        let query={}
        let skip=req.body.skip
        let limit=req.body.limit
        if(typeof skip !== "number"){
            skip=0
        }
        if(typeof  limit!== "number"){
            limit=500
        }

        if(begin_date && end_date){
            query.created_at={
                $gte:new Date(begin_date),
                $lte:new Date(end_date)
            }
        }else{
            query.created_at={
                $gte:moment().subtract(1,"days").startOf("day"),
                $lte:moment()
            }
        }

        let data=await auditLogsSchema.find().sort({created_at:-1}).skip(parseInt(skip)).limit(parseInt(limit))

        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse(data))
    }catch (error){

        let errorRes=Response.errorResponse(error)
        return res.status(errorRes.code).json(errorRes)
    }
}