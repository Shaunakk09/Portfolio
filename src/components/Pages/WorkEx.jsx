import React from 'react'
import { Card } from '../Card'

export const WorkEx = ({theme}) => {
  const insurance = {
    title: "PAYTM INSURANCE BROKING PRIVATE LIMITED",
    role: "SOFTWARE ENGINEER",
    date: "Jan 2024 - Present",
    desc: [
      "Demonstrated leadership in implementing a Backend-for-Frontend (BFF) layer for the ReactJs frontend.",
      "Achieved a substantial 30% reduction in system latency and a consequent 20% improvement in overall load efficiency.",
      "Instrumental contributions in optimizing API response time by 25% and enhancing application responsiveness by 15%."
    ],
    images: [
        "./icons/skills/javascript.svg",
        "./icons/skills/nodejs.svg",
        "./icons/skills/react.svg"
    ]
  };
  const ocl = {
    title: "ONE 97 COMMUNICATIONS LIMITED",
    role: "SOFTWARE ENGINEER",
    date: "Jan 2023 - Jan 2024",
    desc: [
      "Spearheaded the development of a blocking mechanism, achieving a significant 10% reduction in invalid database calls.",
      "Enhanced system resilience against potential threats, including mitigating the risk of DDoS flood attacks. ",
    ],
    images: [
        "./icons/skills/springBoot.svg",
        "./icons/skills/redis.svg",
        "./icons/skills/kafka.svg"
    ]
  };
  const ey = {
    title: "ERNST & YOUNG",
    role: "SOFTWARE ENGINEER INTERN",
    date: "Dec 2021 - Jan 2022",
    desc: [
      "Entrusted with the responsibility of enhancing the document management system portal.",
      "Focused on architecting intricate unstructured models using MongoDB in conjunction with Django.",
      "Achieved a significant efficiency boost of 30% in data retrieval and processing through optimized architecture."
    ],
    images: [
        "./icons/skills/django.svg",
        "./icons/skills/python.svg",
    ]
  };
  return (
    <main id="work-ex">
        <section className="py-2 sm:ml-20 sm:mr-18 sm:mb-20">
          <h5 className={`m-2 sm:m-4 text-xl sm:text-2xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>Work Experience</h5>
          <div className="flex justify-start flex-wrap">
            <Card theme={theme} company={insurance}/>
            <Card theme={theme} company={ocl}/>
            <Card theme={theme} company={ey}/>
          </div>
        </section>
    </main>
  )
}