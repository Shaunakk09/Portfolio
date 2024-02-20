import React from 'react'
import { SkillBar } from '../SkillBar'
import { Training } from './Training'

export const Skills = ({theme}) => {
  const skills = [
    {
        title: "REACT",
        percentage: "90"
    },
    {
        title: "APACHE KAFKA",
        percentage: "85"
    },
    {
        title: "SPRING BOOT",
        percentage: "95"
    },
    {
        title: "NODEJS",
        percentage: "80"
    },
    {
        title: "DJANGO",
        percentage: "70"
    },
    {
        title: "AWS",
        percentage: "95"
    },
  ];
  const images = [
    require("./icons/certifications/aws.png"),
    require("./icons/certifications/django.png"),
    require("./icons/certifications/kafka.png"),
    require("./icons/certifications/nestJs.png"),
    require("./icons/certifications/python.png"),
    require("./icons/certifications/github.png"),
  ];
  return (
    <>
        <section id="skills" className="py-2 mb-7 sm:ml-20 sm:mr-18 sm:mb-16">
            <h5 className={`m-2 sm:m-4 text-xl sm:text-2xl font-bold tracking-wide ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>Skills</h5>
            <div className="flex flex-col">
                <SkillBar theme={theme} skills={skills}/>
            </div>
        </section>
        <section className="py-2 mb-10 sm:ml-20 sm:mr-18 sm:mb-20">
            <h5 className={`m-2 sm:m-8 text-xl sm:text-2xl font-bold tracking-wide ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap text-center`}>Training & Certification</h5>
            <Training  images={images} interval= {2000} theme={theme}/>
        </section>
    </>

  )
}