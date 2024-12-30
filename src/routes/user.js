import { Router } from "express";
import { uAdd, uAuth, uDelete, uRegister, uUpdate, uView } from "../controller/user.js";
import Auth from "../lib/auth.js";


const auth=Auth();


export const userRouter = Router();

userRouter.post('/auth',uAuth)
userRouter.post('/register',uRegister)

userRouter.all('*',auth.authenticate(), (req,res,next)=>{
    next()
})

userRouter.get('/',auth.checkRoles('user_view'),uView)
userRouter.post('/add',auth.checkRoles('user_add'),uAdd)
userRouter.post('/update',auth.checkRoles('user_update'),uUpdate)  
userRouter.post('/delete',auth.checkRoles('user_delete'),uDelete)