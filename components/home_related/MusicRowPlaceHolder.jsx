import {Box, Button, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";
import MusicRow from "./MusicRow.jsx";

export default function MusicRowPlaceHolder({colors, box_shadow, title, list}) {
    let titleArr = title.split(" ")

    return (
        <Box sx={{mb: 5}}>

            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <Typography variant="h3" sx={{fontWeight: 700, color: colors.white, fontSize: 32}}>
                    {titleArr[0] + titleArr[1] + ' '}
                    <Box component="span" sx={{color: colors.pink}}>
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
                    <ChevronRightIcon/>
                </Button>
            </Box>

            <Box sx={{display: 'flex', gap: 3, overflowX: 'auto', pb: 1}}>
                {list.map((song, idx) => (
                    <MusicRow key={idx} song={song} colors={colors} box_shadow={box_shadow}/>
                ))}
            </Box>
        </Box>
    )
}