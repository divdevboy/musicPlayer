import { Routes, Route } from 'react-router-dom';
import Home from "./components/home_related/Home.jsx";
import NowPlaying from "./components/NowPlaying.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
        </Routes>
    );
}
