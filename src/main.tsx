import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { appReducer } from "./appReducer";
import DartNetApp from "./DartNetApp";
import i18n from "./i18n";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "dark"
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Provider store={createStore(appReducer)}>
          <CssBaseline />
          <DartNetApp />
        </Provider>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
