import { Router } from "express";
import { rAdd, rDelete, rUpdate, rView } from "../controller/role.js";
import Auth from "../lib/auth.js";

const auth=Auth();

export const roleRouter=Router();
roleRouter.all('*',auth.authenticate(), (req,res,next)=>{
    next()
})

roleRouter.get('/',auth.checkRoles("role_view"),rView)
roleRouter.post('/add',auth.checkRoles("role_add"),rAdd)
roleRouter.post('/update',auth.checkRoles("role_update"),rUpdate)
roleRouter.post('/delete',auth.checkRoles("role_delete"),rDelete)