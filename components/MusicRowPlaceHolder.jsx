import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";

export default function MusicRowPlaceHolder ({colors,box_shadow,title}){

    const weeklySongs = [
        { title: 'Whatever It Takes', artist: 'Imagine Dragons', img: 'https://via.placeholder.com/120x120?text=Album' },
        { title: 'Skyfall', artist: 'Adele', img: 'https://via.placeholder.com/120x120?text=Album' },
        { title: 'Superman', artist: 'Eminem', img: 'https://via.placeholder.com/120x120?text=Album' },
        { title: 'Softcore', artist: 'The Neighborhood', img: 'https://via.placeholder.com/120x120?text=Album' },
        { title: 'The Loneliest', artist: 'Måneskin', img: 'https://via.placeholder.com/120x120?text=Album' },
    ];
let titleArr = title.split(" ")

    return(
        <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: colors.white, fontSize: 32 }}>
                    {titleArr[0]+titleArr[1]+ ' '}
                    <Box component="span" sx={{ color: colors.pink }}>
                        {titleArr[2]}
                    </Box>
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: colors.pink,
                        color: colors.pink,
                        borderRadius: '50%',
                        minWidth: 44,
                        minHeight: 44,
                        ml: 2,
                        '&:hover': {
                            borderColor: colors.pinkHover,
                            color: colors.pinkHover,
                        },
                    }}
                >
                    <ChevronRightIcon />
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 1 }}>
                {weeklySongs.map((song, idx) => (
                    <Card
                        key={song.title}
                        sx={{
                            minWidth: 180,
                            maxWidth: 180,
                            background: colors.cardBg,
                            borderRadius: 3,
                            boxShadow: `0 2px 16px 0 #181818`,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: `0 0 16px 2px ${box_shadow}`,
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="120"
                            image={song.img}
                            alt={song.title}
                            sx={{ borderRadius: 3 }}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ color: colors.white, fontWeight: 700, fontSize: 20 }}>
                                {song.title}
                            </Typography>
                            <Typography sx={{ color: colors.textGray, fontSize: 16 }}>
                                {song.artist}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}