import React, { useState, useEffect } from 'react';
import aboutImg from '../assets/about.jpg';
import { RiDoubleQuotesL } from 'react-icons/ri';
import CountUp from 'react-countup';

const About = () => {
  const statistics = [
    { label: "Happy Clients", value: 1200 },
    { label: "Cities Served", value: 15 },
    { label: "Projects Completed", value: 350 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;   // Position of the top edge of 'about' relative to the viewport
        const isVisible = top < window.innerHeight - 100;        // If the top edge of 'about' is within 100px from the bottom of the window
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="max-padd-container py-16 xl:py-28" id="about">
      {/* Container */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 relative">
          <img 
            src={aboutImg} 
            alt="About Havuary"
            className="rounded-3xl rounded-tr-[155px] w-[488px]" 
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col">
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="text-2xl" />
            </span>
            <p className="text-center relative bottom-3 text-black">
              "At Havuary, we turn visions into reality, creating extraordinary spaces and experiences that stand the test of time."
            </p>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex-1 flex justify-center flex-col">
          <span className="text-xl font-medium text-black">Our Vision</span>
          <h2 className="text-3xl font-bold text-black">Shaping the Future of Real Estate with Innovation and Integrity</h2>
          <p className="py-5 text-lg text-black">
            At Havuary, we’re driven by a passion for innovation and a commitment to excellence. We specialize in crafting tailored real estate solutions that elevate communities and transform spaces. From residential to commercial properties, our team is dedicated to delivering exceptional results, with a focus on quality, sustainability, and customer satisfaction.
          </p>

          {/* Statistics Container */}
          <div className="flex flex-row gap-4">
            {statistics.map((statistic, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={10}
                    delay={3}
                  >
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef} className="text-3xl font-semibold text-black">{statistic.value}</h3>
                    )}
                  </CountUp>
                  <h4 className="text-lg font-semibold text-black">+</h4>
                </div>
                <p className="text-sm text-black">{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
