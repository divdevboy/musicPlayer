import React from 'react';
import {Box} from '@mui/material';
import Sidebar from "./sidebar/Sidebar.jsx";
import Hero from "./Hero.jsx";
import MusicRowPlaceHolder from "./MusicRowPlaceHolder.jsx";

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
    return (
        <Box sx={{display: 'flex', minHeight: '100vh', background: colors.bg}}>

            <Sidebar colors={colors}/>
            {/* Main Content */}
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                <Box sx={{flex: 1, p: 4, background: colors.bg}}>
                    <Hero colors={colors}/>

                    Weekly Top Songs
                    <MusicRowPlaceHolder colors={colors} box_shadow={colors.pink} title={"Weekly Top Songs"}/>

                    New Release Songs
                    <MusicRowPlaceHolder colors={colors} box_shadow={colors.blue} title={"New Release Songs"}/>

                </Box>
            </Box>
        </Box>
    );
};

export default Home; 