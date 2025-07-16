import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./Home.jsx";
import NowPlaying from "../components/NowPlaying";

createRoot(document.getElementById('root')).render(
  //<StrictMode>
   <Home/>
//  </StrictMode>,
)
