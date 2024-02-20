import React , { useState } from 'react'
import './css/menu.css'
export const Menu = ({theme}) => {
  const [isOpen, setIsOpen] = useState(false);
  document.querySelectorAll('.scroll-button').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

  return (
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <div class={`floating-container ${isOpen ? 'active' : ''}`}>
            <div class="floating-button">
                <button id="menu-button" className='bg-[#111827]' onClick={() => setIsOpen(!isOpen)} style={{
                borderRadius: "50%", 
                overflow: "hidden", 
                padding: 5, 
                border: "none", 
                position: "fixed", 
                bottom: "20px", 
                right: "20px",
                opacity: 0.5
                }}>
                    <img src={`./icons/menu.svg`} width={50} height={50} alt='theme'/>
                </button>
            </div>
            <div class="element-container">
                <span class={`float-element ${isOpen ? 'active' : ''} tooltip-left`}>
                <button className="scroll-button" data-target="about-me" onClick={() => setIsOpen(!isOpen)}>About Me</button>
                </span>
                
                <span class={`float-element ${isOpen ? 'active' : ''}`}>
                <button className="scroll-button" data-target="education" onClick={() => setIsOpen(!isOpen)}>Education</button>
                </span>

                <span class={`float-element ${isOpen ? 'active' : ''}`}>
                <button className="scroll-button" data-target="work-ex" onClick={() => setIsOpen(!isOpen)}>Work Ex</button>
                </span>

                <span class={`float-element ${isOpen ? 'active' : ''}`}>
                <button className="scroll-button" data-target="skills" onClick={() => setIsOpen(!isOpen)}>Skills</button>
                </span>

                <span class={`float-element ${isOpen ? 'active' : ''}`}>
                <button className="scroll-button" data-target="work-ex" onClick={() => setIsOpen(!isOpen)}>Projects</button>
                </span>
            </div>
            </div>
    </div>
  )
}