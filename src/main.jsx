import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NowPlaying from "../components/NowPlaying.jsx";
import Home from "./Home.jsx";

createRoot(document.getElementById('root')).render(
  //<StrictMode>
   <NowPlaying/>
//  </StrictMode>,
)
