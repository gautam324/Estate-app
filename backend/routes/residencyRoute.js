import express from 'express';
import { 
    createResdidency, 
    getAllResidencies, 
    getResidency 
  } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router()
router.post("/create",jwtCkeck, createResdidency)
router.get("/allresd", getAllResidencies)
router.get("/:id", getResidency)
export { router as residencyRoute }