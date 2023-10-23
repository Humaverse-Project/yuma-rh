import React from 'react'
import { theme } from './theme'
import Navigation from './Navigation'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from "react-redux";
import store from "./store";
// fonts
import '@fontsource/montserrat/400.css' // Importez la variante 400 (Regular) de Montserrat
import '@fontsource/montserrat/700.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
)
