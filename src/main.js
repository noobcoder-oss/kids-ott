import React from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App.js";

createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
