import { ExtractJwt,Strategy } from "passport-jwt" 
import passport from "passport"
import userSchema from "../models/user.schema.js"
import roleSchema from "../models/role.schema.js"
import rolePrivlegesSchema from "../models/rolePrivleges.schema.js"
import priv from '../config/rolePrivleges.js'
import config from "../config/index.js"
import Response from "./Response.js"
import CustomError from "./error.js"
import Enum from "../config/Enum.js"

 

export default function Auth (){
    let strategy = new Strategy({
        secretOrKey: config.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done)=>{
        try{
            let user=await userSchema.findById({_id:payload.id}).lean()
            if(user){
                let rolePrivleges=await rolePrivlegesSchema.find({role_id:user.role_id}).lean()
                let role=await roleSchema.findById({_id:user.role_id}).lean()
                let privleges= await rolePrivleges.map(rp=>priv.privileges.find(p=>p.key===rp.permissions))
                done(null,{
                    _id:user._id,
                    email:user.email,
                    role_name:role.role_name,
                    privleges,
                    exp:parseInt(Date.now()/1000)+24*60*60
                })
            }else{
                done(new Error("User not found"),null)
            }
        }catch(error){
            done(error)
        }
    })
    passport.use(strategy)
    return {
        initialize:()=>{
            return passport.initialize()
        },
        authenticate:function (){
            return passport.authenticate("jwt",{session:false})
        }
        ,
        checkRoles:(...expectedRoles)=>{
            return (req,res,next)=>{
                let i=0
                let pers=req.user.privleges.filter(x=>x).map(x=>x.key)
                
                while(i<expectedRoles.length && !pers.includes(expectedRoles[i])) i++;
                if(i>= expectedRoles.length){
                    let response= Response.errorResponse(new CustomError(Enum.HTTP_CODES.UNAUTHORIZED,"UNAUTHORIZED","You are not authorized to access this resource"))
                    return res.status(response.code).json(response) 
                }
                return next()
                
            }
        }
    }
}