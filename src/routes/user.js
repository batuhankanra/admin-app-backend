import { Router } from "express";
import { uAdd, uDelete, uUpdate, uView } from "../controller/user.js";


export const userRouter = Router();

userRouter.get('/',uView)
userRouter.post('/add',uAdd)
userRouter.post('/update',uUpdate)  
userRouter.post('/delete',uDelete)