import { HomePage } from "./components/HomePage";
import { Header } from "./components/Layouts/Header";

import React, { useState } from 'react'

function App() {
  const [theme, setTheme] = useState('darkMode');
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <HomePage theme={theme} setTheme={setTheme}/>
    </>
  );
}

export default App;
