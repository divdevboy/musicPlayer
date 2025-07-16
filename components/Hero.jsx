import {Box} from "@mui/material";
import heroImg from "../src/assets/hero.png";
import React from "react";
import Header from "./Header.jsx";
import HeroContent from "./HeroContent";

export default function Hero({colors}){
    return(
        <div>
            Hero Section
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(90deg, rgba(24,24,24,0.7) 40%, rgba(238,16,176,0.15)), url(${heroImg})`,
                    backgroundSize: '140% 100%',
                    backgroundPosition: '60% center',
                    borderRadius: '25px',
                    boxShadow: `0 0 32px 0 #181818`,
                    minHeight: 595,
                    mb: 5,
                    mt: 3,
                    pl: 7,
                    pr: 5,
                    py: 6,
                    position: 'relative',
                    overflow: 'hidden',
                    width: '88%',
                    ml: '1.5%',
                    mr: '9%',
                }}
            >
                <Header colors={colors}/>
                <HeroContent colors={colors}/>
            </Box>
        </div>
    )
}