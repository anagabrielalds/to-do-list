import React, { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../styles/themes';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [tema, setTema] = useState(lightTheme);

  const toggleTheme = () => {
    debugger
    if(isDarkTheme){
      setTema(darkTheme)
    }else{
      setTema(lightTheme);
    }
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, tema}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
