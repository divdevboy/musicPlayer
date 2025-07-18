import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import Sidebar from "../sidebar/Sidebar.jsx";
import Hero from "./Hero.jsx";
import MusicRowPlaceHolder from "./MusicRowPlaceHolder.jsx";
import MiniPlayer from "./MiniPlayer.jsx";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

// Color palette from Figma
const colors = {
    bg: '#181818',
    pink: '#EE10B0',
    pinkHover: '#D0609E',
    pinkSelected: '#BE0D8D',
    blue: '#0E9EEF',
    blueHover: '#0D8ED7',
    blueSelected: '#0B7EBF',
    white: '#FFFFFF',
    gray: '#FDCFF7',
    cardBg: '#23232a',
    textGray: '#BEB8D8',
};


const Home = () => {
    const navigate = useNavigate();
    const [musicData, setMusicData] = useState(null);

    useEffect(() => {
        fetch("https://utotech.ir/songs.php")
            .then(r => r.json())
            .then((data) => setMusicData(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <Box sx={{display: 'flex', minHeight: '100vh', background: colors.bg}}>

            <Sidebar colors={colors}/>
            {/* Main Content */}
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                <Box sx={{flex: 1, p: 4, background: colors.bg}}>
                    <Hero colors={colors}/>
                    {
                        musicData?.map((it,idx) =>(
                            <MusicRowPlaceHolder colors={colors} box_shadow={colors.pink} title={it.list_title} key={idx} list={it.tracks}/>
                        ))
                    }

                    <MiniPlayer onclick={() => navigate('/now-playing')}/>
                </Box>
            </Box>

        </Box>
    );
};

export default Home; 