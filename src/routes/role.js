import { Router } from "express";
import { rAdd, rDelete, rUpdate, rView } from "../controller/role.js";

export const roleRouter=Router();

roleRouter.get('/',rView)
roleRouter.post('/add',rAdd)
roleRouter.post('/update',rUpdate)
roleRouter.post('/delete',rDelete)