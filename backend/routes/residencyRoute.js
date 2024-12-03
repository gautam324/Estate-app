import express from 'express';
import { createResdidency } from '../controllers/residencyController.js';
const router = express.Router()
router.post("/create", createResdidency)
export { router as residencyRoute }