import React from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import Intro from "./Intro";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <Intro>
    <App />
  </Intro>
);
