import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { Group, Button } from '@mantine/core'

const UploadImage = ({ nextStep, prevStep, propertyDetails, setPropertyDetails }) => {
  
  const[imageURL, setImageURL] = useState(propertyDetails.image)
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const handleNext = () => {                                             
    setPropertyDetails((prev) => ({...prev, image: imageURL}))           
    nextStep()                                                         
    //console.log(propertyDetails);
  }

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;                           
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dvwl07a4l",
        uploadPreset: "user32125",
        maxFile: 1
      },
      (err, result) => {                                                  
        if(result.event === "success"){                               
          setImageURL(result.info.secure_url)                            
        }
      }
    )
  })

  return (
    <div className="mt-12 flexCenter flex-col">
      {
        !imageURL ? (
          <div 
            onClick={() => widgetRef.current?.open()}
            className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
          >
            <MdOutlineCloudUpload 
              size={44}
              color="grey"
            />
            <span>Upload Image</span>
          </div>
        ) : (
          <div
            onClick={() => widgetRef.current?.open()} 
            className="w-3/4 h-[22rem] rounded-xl cursor-pointer overflow-hidden"
          >
              <img src={imageURL} alt="" className="h-full w-full object-cover"/>
          </div>
        )
      }

      <Group justify="center" mt="xl">
        <Button onClick={prevStep}>Go Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
      </Group>
    </div>
  )
}

export default UploadImage