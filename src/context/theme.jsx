import  { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../styles/themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [IconMode, setIconMode] = useState(<LightModeIcon />)
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    isDarkMode ? setIconMode(<DarkModeIcon />) : setIconMode(<LightModeIcon />)
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{IconMode, isDarkMode, toggleTheme }}>
       <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
