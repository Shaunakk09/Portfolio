import React from 'react'
import { AboutMe } from './Pages/aboutMe'
import { Education } from './Pages/Education'
import { WorkEx } from './Pages/WorkEx'
import {Menu} from '../menu'
import { Skills } from './Pages/Skills'
import { Project } from './Pages/Project'
export const HomePage = ({theme , setTheme}) => {
  return (
    <>
      <div className={`bg-[${theme === "darkMode" ? "#1e293b" : "#ffffff"}] mx-auto py-7 px-7`}>
        <AboutMe theme={theme} setTheme={setTheme}/>
        <Education theme={theme} setTheme={setTheme}/>
        <WorkEx theme={theme} setTheme={setTheme}/>
        <Skills theme={theme} setTheme={setTheme}/>
        <Project theme={theme} setTheme={setTheme}/>
        <Menu theme={theme}/>
      </div>
    </>
  )
}
