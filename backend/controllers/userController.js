import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createUser = asyncHandler(async(req, res) => {
  console.log("creating user");
  let {email} = req.body;
  

  const userExists = await prisma.user.findUnique({where: {email: email}});
  if(!userExists){
    const user = await prisma.user.create({data: req.body});
    res.send({
      message: "user registered successfully",
      user: user,
    })
  }else{
    res.status(201).send({
      message: "user already registered"
    }) 
  }
});
// To book a visit to resd
export const bookVisit = asyncHandler(async(req, res) => {
  const {email, date} = req.body;
  const {id} = req.params;
  try {
    
    const allreadyBooked = await prisma.user.findUnique({ // Se busca el usuario con el email propocionado y sus visitas programadas
      where: { email },
      select: { bookedVisits: true }
    });
    if(allreadyBooked.bookedVisits.some((visit) => visit.id === id)){ // Si en sus visitas programadas hay alguna cuyo id coincida con el del argumento
      res.status(400).json({
        message: "This residency already booked bu you"               // mensaje de que ya estaba programada (booked)
      })
    }else{
      await prisma.user.update({                                      // Si en sus visitas programadas no hay ninguna que coincida con el id del argumento
        where: { email },                                             // se procede a actualizar el campo bookedVisits del usuario con dicho id
        data: {
            bookedVisits: { push: {id, date}}
        }
      })
    }
    res.send("Your visit is booked succesfully");
  } catch (err) {
    throw new Error(err.message)
  }
})