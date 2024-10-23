import express from 'express';
import protectRoutes from '../middleware/protectRoutes.js';
import { getUserForSidebar } from '../controller/user.contoller.js';

const router=express.Router();

router.get("/",protectRoutes,getUserForSidebar)

export default router;