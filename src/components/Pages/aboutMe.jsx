import React from 'react'

export const AboutMe = ({theme}) => {
  return (
    <div id="about-me" className={`ml-0 mr-0 mb-5 sm:ml-20 sm:mr-20 sm:mb-20 max-w-full bg-[${theme === "darkMode"? "#1f2937": "#feffff"}] rounded-lg shadow flex flex-col items-center sm:items-start sm:flex-row`}>
        <img className="h-48 sm:h-80" src={`./icons/ME.png`} alt="" />
        <div className='py-3 sm:pt-5 flex flex-col items-center sm:items-start'>
            <h5 className={`mb-2 sm:mb-3 text-xl sm:text-2xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>About Me</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 sm:pt-2 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>I am a highly skilled and motivated Software Engineer with a strong background in Computer Science. I completed my education at Thapar Institute of Engineering and Technology. Throughout my academic journey, I developed a comprehensive understanding of software development principles, which I have further refined through my professional experiences with renowned companies such as Paytm and Ernst & Young.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>Outside of my professional life, I have a variety of interests. I enjoy playing badmintion, watching anime and working out at the gym. These habits have enhance my time management and consistency.</h5>
            <h5 className={`ml-4 mr-2 mb-3 sm:ml-0 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>As a Software Engineer, I am passionate about creating innovative solutions and pushing the boundaries of technology. I am constantly seeking opportunities to expand my knowledge and stay up-to-date with the latest advancements in the field. With my strong technical skills, collaborative mindset, and dedication to excellence, I am confident in my ability to contribute to the success of any software development team.</h5>
        </div>
    </div>
  )
}