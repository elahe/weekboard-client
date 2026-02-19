import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F05A28", // orange from screenshot
    },
    success: {
      main: "#3BA776", // green circle
    },
    error: {
      main: "#EF4444", // red circle
    },
    background: {
      default: "#F8F6F4", // warm light background
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 800,
    },
  },
});


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
