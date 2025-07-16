import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";
import MusicRow from "./MusicRow";

export default function MusicRowPlaceHolder ({colors,box_shadow,title}){

    const weeklySongs = [
        { title: 'Whatever It Takes', artist: 'Imagine Dragons', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmP6JnV6bB19DyIDpxmqjqhuHywIOu_bxkiw&s' },
        { title: 'Skyfall', artist: 'Adele', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoJapC949FkQ_ekY5cKTBjALF19O-muwH6Q&s' },
        { title: 'Superman', artist: 'Eminem', img: 'https://i1.sndcdn.com/artworks-EG2zqGrtkVD03ZQ9-nNwZ6A-t500x500.jpg' },
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
                    <MusicRow song={song} colors={colors} box_shadow={box_shadow}/>
                ))}
            </Box>
        </Box>
    )
}