import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import i18n from "./i18n";
import DartNetApp from "./DartNetApp";
import { appReducer } from "./appReducer";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const store = configureStore({
  reducer: appReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <CssBaseline />
          <DartNetApp />
        </Provider>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
