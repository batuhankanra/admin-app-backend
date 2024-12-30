import { Router } from "express";
import { cAdd, cDelete, cUpdate, cView } from "../controller/categories.js";
import Auth from "../lib/auth.js";


const auth=Auth();


export const catRouter=Router();

catRouter.all('*',auth.authenticate(), (req,res,next)=>{
    next()
})
catRouter.get('/',auth.checkRoles('category_view'), cView)
catRouter.post('/add',auth.checkRoles('category_add'), cAdd)
catRouter.post('/update',auth.checkRoles('category_update'), cUpdate)
catRouter.post('/delete',auth.checkRoles('category_delete'), cDelete)