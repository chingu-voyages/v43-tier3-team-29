import React, { useState, useEffect } from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import * as THREE from 'three'
import Intro from './Intro'
import App from './App'

const root = createRoot(document.getElementById("root"));
root.render(<Intro><App /></Intro>);
