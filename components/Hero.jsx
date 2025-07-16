import {Box, Button, InputBase, Stack, Typography} from "@mui/material";
import heroImg from "../src/assets/hero.png";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

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
                Header Row (moved from AppBar)
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 0, mt: 0 }}>
                    Search Bar
                    <Box
                        sx={{
                            background: '#23232a',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 280,
                            maxWidth: 340,
                            flex: 1,
                        }}
                    >
                        <SearchIcon sx={{ color: colors.gray, mr: 1 }} />
                        <InputBase
                            placeholder="Search for Music, Artists..."
                            sx={{ color: colors.gray, width: '100%' }}
                            inputProps={{ 'aria-label': 'search' }}
                            disabled
                        />
                    </Box>
                    Nav Links
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 6 }}>
                        <Button sx={{ color: colors.white, fontWeight: 500 }}>About Us</Button>
                        <Button sx={{ color: colors.white, fontWeight: 500 }}>Contact</Button>
                        <Button sx={{ color: colors.white, fontWeight: 500 }}>Premium</Button>
                    </Box>
                    Auth Buttons
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 6 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: colors.blue,
                                color: colors.blue,
                                fontWeight: 700,
                                borderRadius: 2,
                                px: 3,
                                '&:hover': {
                                    borderColor: colors.blueHover,
                                    color: colors.blueHover,
                                },
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                background: colors.pink,
                                color: colors.white,
                                fontWeight: 700,
                                borderRadius: 2,
                                px: 3,
                                boxShadow: `0 0 12px 2px ${colors.pink}`,
                                '&:hover': {
                                    background: colors.pinkHover,
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                Hero Content
                <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: 40,
                            color: colors.white,
                            mb: 4,
                            lineHeight: 1.1,
                            textAlign: 'left',
                            maxWidth: 480,
                        }}
                    >
                        All the{' '}
                        <Box component="span" sx={{ color: colors.pink }}>
                            Best Songs
                        </Box>{' '}
                        in One Place
                    </Typography>
                    <Typography
                        sx={{ color: colors.textGray, fontSize: 20, mt: 4, mb: 4, maxWidth: 480, textAlign: 'left' }}
                    >
                        On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ justifyContent: 'flex-start' }}>
                        <Button
                            variant="contained"
                            sx={{
                                background: colors.pink,
                                color: colors.white,
                                fontWeight: 700,
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                fontSize: 18,
                                boxShadow: `0 0 16px 2px ${colors.pink}`,
                                '&:hover': {
                                    background: colors.pinkHover,
                                },
                            }}
                        >
                            Discover Now
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: colors.blue,
                                color: colors.blue,
                                fontWeight: 700,
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                fontSize: 18,
                                '&:hover': {
                                    borderColor: colors.blueHover,
                                    color: colors.blueHover,
                                },
                            }}
                        >
                            Create Playlist
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}