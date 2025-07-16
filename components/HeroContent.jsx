import {Box, Button, Stack, Typography} from "@mui/material";
import React from "react";

export default function HeroContent({colors}) {
    return (
        <Box sx={{
            flex: 1,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
        }}>

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
                <Box component="span" sx={{color: colors.pink}}>
                    Best Songs
                </Box>{' '}
                in One Place
            </Typography>
            <Typography
                sx={{color: colors.textGray, fontSize: 20, mt: 4, mb: 4, maxWidth: 480, textAlign: 'left'}}
            >
                On our website, you can access an amazing collection of popular and new songs. Stream your favorite
                tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for
                you!
            </Typography>
            <Stack direction="row" spacing={3} sx={{justifyContent: 'flex-start'}}>
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

    )
}