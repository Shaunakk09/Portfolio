import React from 'react'
import { ProjectCard } from '../ProjectCard'

export const Project = ({theme}) => {
  const project1 = {
    "webUrl": "https://cinemate-shaunakk09.netlify.app",
    "imageUrl": require("./icons/projects/Cinemate.png"),
    "title": "Cinemate",
    "subTitle": "Source for movie and TV content",
  };

  const project2 = {
    "webUrl": "https://cinemate-shaunakk09.netlify.app",
    "imageUrl": require("./icons/projects/TaskMate.png"),
    "title": "TaskMate",
    "subTitle": "Helps you manage your tasks",
  };

  const project3 = {
    "webUrl": "https://github.com/Shaunakk09/sentiment_analysis",
    "imageUrl": require("./icons/projects/Sentiment.png"),
    "title": "Sentiment Analysis",
    "subTitle": "Helps you understand setniment behind a review",
  };

  const project4 = {
    "webUrl": "https://blackjack-shaunakk09.netlify.app/",
    "imageUrl": require("./icons/projects/blackjack.png"),
    "title": "Black Jack",
    "subTitle": "Play black jack with computer",
  };

  const project5 = {
    "webUrl": "https://codebook-shaunakk09.netlify.app/",
    "imageUrl": require("./icons/projects/CodeBook.png"),
    "title": "Code Book",
    "subTitle": "E Commerce website for books",
  };

  return (
    <div>
        <main id="projects">
            <section className="py-2 sm:ml-20 sm:mb-20">
            <h5 className={`text-xl sm:text-2xl font-bold tracking-normal ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>Projects</h5>
            <div className="flex flex-wrap items-center justify-center gap-y-4 sm:gap-y-8 gap-x-8 sm:gap-x-36">
                <ProjectCard theme={theme} project={project1}/>
                <ProjectCard theme={theme} project={project2}/>
                <ProjectCard theme={theme} project={project3}/>
                <ProjectCard theme={theme} project={project4}/>
                <ProjectCard theme={theme} project={project5}/>
            </div>
            </section>
        </main>
    </div>
  )
}