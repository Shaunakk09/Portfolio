import React from 'react'

export const Card = ({theme,company}) => {
  return (
    <>
    <div className={`max-w-sm mb-3 sm:mr-8 sm:mb-60 rounded-lg shadow flex flex-col`} style={{ backgroundImage: `url(./icons/background/${theme}/blurry-gradient.svg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h5 className={`ml-3 mt-3 sm:mt-4 sm:ml-4 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-[#e4ae48]" : "text-gray-900"} whitespace-nowrap`}>{company.title}</h5>
        <div className={`ml-3 sm:ml-4 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-[#e4ae48]" }`}>{company.role}</div>
        <div className={`ml-3 sm:ml-4 text-xs sm:text-xs font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>{company.date}</div>
        {company.date2 && <div className={`ml-3 sm:ml-4 text-xs sm:text-xs font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>{company.date2}</div>}
        {
            company.desc.map((description,index) => {
                return (
                    <>
                        <div key={index} className={`ml-3 mt-2 mr-3 mb-2 sm:mb-1 sm:mt-2 sm:ml-4 sm:mr-4 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-700"}`}>
                            {index+1}. {description}
                        </div>
                    </>
                );
            })
        }
        <div className="flex justify-center mt-2 sm:mt-3">
            {
                company.images.map((image,index) => {
                    return (
                        <div key={index}>
                            <img className="h-10 w-10 mr-3 mb-3 sm:mr-4 sm:mb-2" src={image} alt="" />
                        </div>
                    );
                })
            }
        </div>
    </div>
    </>
  )
}
