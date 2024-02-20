import React from 'react'
import '../css/skill.css'

export const SkillBar = ({theme,skills}) => {
  return (
    <div>
        {skills.map((skill, index) => (
        <div key={index}>
            <div className={`m-2 sm:m-4 text-xs sm:text-base font-bold tracking-wide ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap flex`}>
            <span>{skill.title}</span>
            <span className={`ml-3 sm:ml-2 font-normal ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>{skill.percentage}%</span>
            </div>
            <div className='pl-2'>
            <div className="bg-[#101826] w-12/12 rounded-sm  sm:w-11/12">
                <div className="pl-20 rounded-sm pr-5 leading-3 sm:leading-4 bg-[#e4ae48]" style={{ width: `${skill.percentage}%` }}>&nbsp;</div>
            </div>
            </div>
        </div>
        ))}
    </div>
  )
}
