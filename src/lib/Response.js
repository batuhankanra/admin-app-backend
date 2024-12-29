import Enum from "../config/Enum.js"
import CustomError from "./error.js"


class Response{
    constructor(){}
    static successResponse(data){
        return {
            data
        }
    }
    static errorResponse(err){
        console.log(err)
        if(err instanceof CustomError){
            return {
                code:err.code,
                error:{
                    message:err.message,
                    description:err.description
                }
            }
        }else if(err.message.includes("E11000")){
            return {
                code:Enum.HTTP_CODES.CONFLICT,
                error:{
                    message:"ALREADY_EXIST",
                    description:"already exist"
                }
            }
        }
        return {
            code:Enum.HTTP_CODES.INT_SERVER_ERROR,
            error:{
                message:"INTERNAL_SERVER_ERROR",
                description:"Something went wrong"
            }
        }
    }   
}
export default Response