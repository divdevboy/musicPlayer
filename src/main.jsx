import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NowPlaying from "../components/NowPlaying.jsx";

createRoot(document.getElementById('root')).render(
  //<StrictMode>
   <NowPlaying/>
//  </StrictMode>,
)
