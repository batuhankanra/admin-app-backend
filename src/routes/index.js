import { Router } from "express";
import { catRouter } from "./categories.js";
import { userRouter } from "./user.js";
import { roleRouter } from "./role.js";
import { aLRouter } from "./auditLogs.js";

export const router = Router();


router.use('/categories',catRouter)
router.use('/user',userRouter)
router.use('/role',roleRouter)
router.use('/auditLogs',aLRouter)