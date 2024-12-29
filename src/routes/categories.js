import { Router } from "express";
import { cAdd, cDelete, cUpdate, cView } from "../controller/categories.js";


export const catRouter=Router();

catRouter.get('/', cView)
catRouter.post('/add', cAdd)
catRouter.post('/update', cUpdate)
catRouter.post('/delete', cDelete)