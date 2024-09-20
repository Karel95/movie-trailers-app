import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Color principal para el tema claro
    },
    secondary: {
      main: '#9c27b0', // Color secundario para el tema claro
    },
    background: {
      default: '#f5f5f5', // Fondo por defecto para el tema claro
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Color principal para el tema oscuro
    },
    secondary: {
      main: '#f48fb1', // Color secundario para el tema oscuro
    },
    background: {
      default: '#121212', // Fondo por defecto para el tema oscuro
    },
  },
});
