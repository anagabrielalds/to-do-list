import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#07a3ce', // Cor principal para botões e elementos de destaque
    },
    text: {
      primary: '#303030', // Cor do texto principal
      secondary: '#c5c2c2', // Cor do texto secundário
    },
    background: {
      default: '#f7f5f5', // Cor de fundo da página
      paper: '#f7f5f5', // Cor de fundo para elementos de superfície, como tabelas
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ff7143", // Menu
          color: '#fff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#ff7143", // Cor de fundo da barra lateral
          color: '#fff'
        },
      },
    },
    MuiTableHead:{
      styleOverrides:{
        root:{
          background: '#ff7143' //header da tabela
        }
      }
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#006596',
      secondary: 'white' // Cor principal para botões e elementos de destaque
    },
    text: {
      primary: '#fff', // Cor do texto principal
      secondary: '#ccc', // Cor do texto secundário
    },
    background: {
      default: '#333', // Cor de fundo da página
      paper: '#333', // Cor de fundo para elementos de superfície, como tabelas
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#e74113", // Menu
          color: '#fff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#e74113", // Cor de fundo da barra lateral
        },
      },
    },
    
    MuiTableHead:{
      styleOverrides:{
        root:{
          background: '#e74113'
        }
      }
    }
  },
});