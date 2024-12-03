import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createResdidency = asyncHandler(async(req, res) => {
  
  const { 
    title, 
    description, 
    price, 
    address, 
    country, 
    city, 
    facilities, 
    image, 
    userEmail 
  } = req.body.data
  try {
    const residency = await prisma.residency.create({
      data: {
        title, 
        description, 
        price, 
        address, 
        country, 
        city, 
        facilities, 
        image, 
        owner: {connect: {email: userEmail}}
      }
    });
    res.send({
      message: "Residency created successfully",
      residency
    })
  } catch (err) {
    if(err.code === "P2002"){
      throw new Error("A residendy with address already there")
    }
    throw new Error(err.message)
  }
})