import React from 'react'

export const Education = ({ theme }) => {
  return (
    <div id="education" className={`ml-0 mr-0 mb-5 sm:ml-20 sm:mr-20 sm:mb-20 max-w-full rounded-lg shadow flex flex-col`} style={{ backgroundImage: `url(./icons/background/${theme}/blob-scene.svg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='ml-3 sm:ml-5 flex flex-row items-center'>
            <img className="h-8 sm:h-8" src={`./icons/${theme}/student.svg`} alt="" />
            <h5 className={`m-3 sm:m-4 text-xl sm:text-2xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"} whitespace-nowrap`}>Education</h5>
        </div>
        <div className='ml-6 mb-3 sm:ml-8 sm:mb-5 flex flex-row items-center relative'>
            <div className={`w-1 h-60 sm:h-72 bg-[${theme === "darkMode" ? "#758CA3" : "#323f4e"}] rounded-full relative -top-4`}></div>
            <div className='flex flex-row absolute top-5 -left-1'>
                <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-[#e4ae48] rounded-full`}></div>
                <div className='flex flex-col relative -top-1'>
                    <div className={`ml-5 sm:ml-6 text-sm sm:text-xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"}`}>Thapar Institute Of Engineering & Technology</div>
                    <div className={`ml-5 sm:ml-6 text-xs sm:text-base font-bold tracking-tight text-[#e4ae48]`}>2019-2023</div>
                    <div className={`ml-5 sm:ml-6 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>B-Tech</div>
                </div>
            </div>
            <div className='flex flex-row absolute top-32 -left-1 sm:top-40'>
                <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-[#e4ae48] rounded-full`}></div>
                <div className='flex flex-col relative -top-1'>
                    <div className={`ml-5 sm:ml-6 text-sm sm:text-xl font-bold tracking-tight ${theme === "darkMode" ? "text-white" : "text-gray-900"}`}>Delhi Public School Sector-45</div>
                    <div className={`ml-5 sm:ml-6 text-xs sm:text-base font-bold tracking-tight text-[#e4ae48]`}>2019</div>
                    <div className={`ml-5 sm:ml-6 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>10 CBSE - 92%</div>
                    <div className={`ml-5 sm:ml-6 text-xs sm:text-base font-bold tracking-tight ${theme === "darkMode" ? "text-gray-400" : "text-gray-700"}`}>12 CBSE - 93%</div>
                </div>
            </div>
        </div>
    </div>
  )
}
