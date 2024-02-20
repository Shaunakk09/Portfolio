import React from 'react'

export const AboutMe = ({theme}) => {
  return (
    <div id="about-me" className={`ml-0 mr-0 mb-5 sm:ml-20 sm:mr-20 sm:mb-20 max-w-full bg-[${theme === "darkMode"? "#1f2937": "#feffff"}] rounded-lg shadow flex flex-col items-center sm:items-start sm:flex-row`}>
        <img className="h-48 sm:h-80" src={`./icons/ME.png`} alt="" />
        <div className='py-3 sm:pt-5 flex flex-col items-center sm:items-start'>
            <h5 className={`mb-2 sm:mb-3 text-xl sm:text-2xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>About Me</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 sm:pt-2 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>Greetings! I'm a dynamic software engineer with a passion for creating cutting-edge solutions. My expertise spans both backend and frontend development, with a strong foundation in React and Node.js. As a fervent Java and Spring Boot aficionado, I bring a wealth of experience in architecting robust systems.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>My skill set extends beyond coding, encompassing AWS, Redis, Kafka, Docker, and KSQL. I excel in orchestrating microservices, optimizing databases, and delving into real-time data processing. Whether it's crafting seamless user interfaces or fine-tuning backend functionality, I take pride in delivering high-quality software solutions.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>Let's connect and embark on a journey to bring innovation to life!</h5>
        </div>
    </div>
  )
}