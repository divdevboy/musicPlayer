import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";

export default function MusicRow({song,colors,box_shadow}){
    return(
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
    )
}