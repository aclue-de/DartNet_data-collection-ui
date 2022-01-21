import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import i18n from './i18n'
import Init from './features/Init'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { I18nextProvider } from 'react-i18next'
import { AppRouter } from './features/AppRouter'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <AppRouter />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
