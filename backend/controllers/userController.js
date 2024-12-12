import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async(req, res) => {
  console.log("creating user");

  let {email} = req.body;
  //console.log(email)

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

    const allreadyBooked = await prisma.user.findUnique({ 
      where: { email },
      select: { bookedVisits: true }
    });

    if(allreadyBooked.bookedVisits.some((visit) => visit.id === id)){ 
      res.status(400).json({
        message: "This residency already booked bu you"             
      })
    }else{
      await prisma.user.update({                                    
        where: { email },                                             
        data: {
          bookedVisits: { push: {id, date}}
        }
      })
    }

    res.send("Your visit is booked succesfully");

  } catch (err) {
    throw new Error(err.message)
  }
});

// To get all bookings
export const allBookings = asyncHandler(async(req, res) => {

  const { email } = req.body;

  try {

    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }
    });

    res.status(200).send(bookings);

  } catch (err) {
    throw new Error(err.message)
  }
})


// To cancel a booking
export const cancelBooking = asyncHandler(async(req, res) => {

  const { email } = req.body;
  const { id } = req.params;  

  try {

    const user = await prisma.user.findUnique({                             
      where: { email },
      select: { bookedVisits: true }                                        
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id)   

    if (index === -1) {                                                   
      res.status(404).json({ message: "Booking not found" })                
    }else{                                                                  
      user.bookedVisits.splice(index, 1);                                 
      await prisma.user.update({                                          
        where: {email},
        data: {                                                            
          bookedVisits: user.bookedVisits
        }
      })

      res.send("Booking cancelled successfully")
    }

  } catch (err) {
    throw new Error(err.message)
  }
});

// To add a residency in favorites list of a user
export const toFav = asyncHandler(async(req, res) => {

  const {email} = req.body; 
  const {rid} = req.params;  

  try {
    const user = await prisma.user.findUnique({ 
      where: {email}
    });

    if (user.favResidenciesID.includes(rid)){            
      const updatedUser = await prisma.user.update({     
        where: {email},
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter( (id) => id !== rid ) 
          }
        }
      })

      res.send({message: "Removed from favourites", user: updatedUser})

    }else{                                             
      const updatedUser = await prisma.user.update({    
        where: {email},
        data: {
          favResidenciesID: {
            push: rid
          }
        }
      })

      res.send({message: "Updated favourites", user: updatedUser})
    }

  } catch (err) {
    throw new Error(err.message)
  }
});
// To get all favourites list
export const getAllFav = asyncHandler(async(req, res) => {
  const { email } = req.body
  try {
    const favResd = await prisma.user.findUnique({
      where: {email},
      select: {favResidenciesID: true}
    });
    res.status(200).send(favResd)
    
  } catch (err) {
    throw new Error(err.message)
  }
})