import express from 'express';
import { allBookings, bookVisit, cancelBooking, createUser, getAllFav, toFav } from "../controllers/userController.js"
import jwtCheck from '../config/auth0Config.js';

const router = express.Router()


router.post('/register', jwtCheck, createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", allBookings)
router.post("/removeBooking/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav", getAllFav)


export  { router as userRoute }