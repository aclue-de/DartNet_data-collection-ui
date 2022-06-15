import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { appReducer } from "./appReducer";
import DartNetApp from "./DartNetApp";
import i18n from "./i18n";
import "./index.css";
import * as ReactDOMClient from "react-dom/client";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Store
const store = configureStore({
  reducer: appReducer,
});

const container = document.getElementById("root");
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <CssBaseline />
          <DartNetApp />
        </Provider>
      </I18nextProvider>
    </ThemeProvider>
  );
}
