import React from 'react'
import { AboutMe } from './Pages/aboutMe'
import { Education } from './Pages/Education'
import { WorkEx } from './Pages/WorkEx'
import { Projects } from './Pages/Projects'
import {Menu} from '../menu'
import { Skills } from './Pages/Skills'
export const HomePage = ({theme , setTheme}) => {
  return (
    <>
      <div className={`bg-[${theme === "darkMode" ? "#1e293b" : "#ffffff"}] mx-auto py-7 px-7`}>
        <AboutMe theme={theme} setTheme={setTheme}/>
        <Education theme={theme} setTheme={setTheme}/>
        <WorkEx theme={theme} setTheme={setTheme}/>
        <Skills theme={theme} setTheme={setTheme}/>
        <Projects theme={theme} setTheme={setTheme}/>
        <Menu theme={theme}/>
      </div>
    </>
  )
}
