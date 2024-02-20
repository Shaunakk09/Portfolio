import React from 'react'
import '../css/projectCard.css'

export const ProjectCard = ({theme,projects}) => {
  return (
    projects.map((project, index) => (
      <div className='flex flex-col' key={index}>
          <h5 className={`mt-3 sm:mt-4 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>{project.title}</h5>
          <div className={`mb-2 sm:mb-4 text-xs sm:text-base font-bold tracking-tight text-gray-400`}>{project.subTitle}</div>
          <div onClick={() => window.open(project.webUrl,"_blank")} className={`sm:mb-2 h-48 w-80 sm:h-52 max-w-full rounded-lg shadow transform transition-all duration-500 ease-in-out hover:scale-105 hover:opacity-80 image-container`} 
              style={{ 
                  backgroundSize: '100% 100%',
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundRepeat: 'no-repeat'
              }}>
              <img src={project.imageUrl} style={{display: 'none'}} alt="training" />
              <img src='./icons/eye.svg' alt='eye icon' className='eye-icon' />
          </div>
      </div>
    ))
  )
}