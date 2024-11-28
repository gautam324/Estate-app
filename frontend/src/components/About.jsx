import React from 'react'
import aboutImg from '../assets/about.jpg'
import { RiDoubleQuotesL } from 'react-icons/ri'

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28">
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* left */}
        <div className="flex-1 relative">
          <img 
            src={aboutImg} 
            alt="About Havuary" 
            className="rounded-3xl rounded-tr-[155px] w-[488px] shadow-lg"
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-6 rounded-lg shadow-xl flexCenter flex-col">
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="text-2xl text-primary" />
            </span>
            <p className="text-center relative bottom-3 font-semibold text-gray-700">
              "Working with Havuary has been an exceptional experience. Their attention to detail and commitment to excellence made finding my dream home a reality."
            </p>
            <span className="text-center font-bold text-primary mt-4">- John Doe</span>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-6 text-gray-900">About Havuary</h2>
          <p className="text-lg text-gray-600 mb-4">
            At Havuary, we believe in more than just real estate. We believe in creating lasting relationships, understanding the unique needs of our clients, and offering personalized services that elevate the property experience. Whether you're buying, selling, or renting, we offer solutions that meet the highest standards of quality and integrity.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our team of experts is dedicated to making your journey seamless, providing you with unparalleled customer service and access to a wide range of properties, from luxurious estates to cozy apartments. At Havuary, your dream home is just a step away.
          </p>
          <p className="text-lg text-gray-600">
            Join the Havuary family today and discover a world of possibilities where excellence and innovation meet in every corner.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
