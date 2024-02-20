import React from 'react'

export const ProjectCard = ({theme,project}) => {
  return (
    <div className='flex flex-col'>
        <h5 className={`mt-3 sm:mt-4 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>{project.title}</h5>
        <div className={`mb-2 sm:mb-4 text-xs sm:text-base font-bold tracking-tight text-gray-400`}>{project.subTitle}</div>
        <div className={`sm:mb-2 h-48 w-80 sm:h-52 max-w-full rounded-lg shadow`} 
            style={{ 
                backgroundSize: '100% 100%',
                backgroundImage: `url(${project.imageUrl})`,
                backgroundRepeat: 'no-repeat'
            }}>
            <img src={project.imageUrl} style={{display: 'none'}} alt="training" />
        </div>
    </div>
  )
}
