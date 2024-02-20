import React , { useState, useEffect } from 'react'

export const Header = ({theme, setTheme }) => {

  const [themeColor, setThemeColor] = useState('bg-neutral-100');

  useEffect(() => {
    if(theme === 'darkMode') {
      setThemeColor('bg-[#111827]');
    } else {
      setThemeColor('bg-neutral-100');
    }
  },[theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "darkMode" ? "lightMode" : "darkMode");
    console.log(theme);
  };
  return (
    <header>      
      <nav className={`${themeColor} px-6 py-8 ring-1 ring-slate-900/5 shadow-xl`}>
        <div className='flex justify-center items-center'>
            <button onClick={handleThemeSwitch}> <img src={`./icons/${theme}/${theme}.svg`} width={20} height={20} alt='theme'/></button>
            <button className='pl-10' onClick={() => window.location.href = "mailto:shaunakahluwalia@gmail.com"}>
              <img src={`./icons/${theme}/gmail.svg`} width={26} height={26} alt='gmail'/>
            </button>
            <a href='https://in.linkedin.com/in/shaunak-ahluwalia-77503217a' className='pl-10' target="_blank" rel='noreferrer'> <img src={`./icons/${theme}/linkedin.svg`} width={26} height={26} alt='linkedIn'/></a>
            <a href='https://github.com/shaunakk09' className='pl-10' target="_blank" rel='noreferrer'> <img src={`./icons/${theme}/github.svg`} width={26} height={26} alt='github'/></a>
            <a href='https://leetcode.com/shaunakk09/' className='pl-10' target="_blank" rel='noreferrer'> <img src={`./icons/${theme}/leetcode.svg`} width={26} height={26} alt='leetCode'/></a>
        </div>
      </nav>
    </header>
  )
}