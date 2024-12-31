import { Router } from "express";
import { aLView } from "../controller/auditLogs.js";


export const aLRouter=Router();


aLRouter.get('/', aLView)