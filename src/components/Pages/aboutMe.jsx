import React from 'react'

export const AboutMe = ({theme}) => {
  return (
    <div id="about-me" className={`ml-0 mr-0 mb-5 sm:ml-20 sm:mr-20 sm:mb-20 max-w-full bg-[${theme === "darkMode"? "#1f2937": "#feffff"}] rounded-lg shadow flex flex-col items-center sm:items-start sm:flex-row`}>
        <img className="h-48 sm:h-80" src={`./icons/ME.png`} alt="" />
        <div className='py-3 sm:pt-5 flex flex-col items-center sm:items-start'>
            <h5 className={`mb-2 sm:mb-3 text-xl sm:text-2xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>About Me</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 sm:pt-2 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>Greetings! I'm an enthusiastic Java and Spring Boot aficionado, armed with a powerful skill set in AWS, redis, Kafka, Docker, and KSQL.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>I thrive on architecting robust solutions, whether it's orchestrating microservices, optimizing databases, or diving into real-time data processing.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>Thriving in collaborative spaces, I'm fueled by the excitement of learning new technologies. My goal? To not just be proficient but to be the innovative spark that elevates software engineering. Let's connect and bring innovation to life!</h5>
        </div>
    </div>
  )
}