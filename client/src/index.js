import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { configureStore } from '@reduxjs/toolkit';
import reducer from './components/reducer.js'
import { Provider } from "react-redux";

const store = configureStore({reducer})

export default store


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
 );