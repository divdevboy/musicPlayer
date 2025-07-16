import {Box, Button, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function Header({colors}){
    return(
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 0, mt: 0 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 6 }}>
                    <Button sx={{ color: colors.white, fontWeight: 500 }}>About Us</Button>
                    <Button sx={{ color: colors.white, fontWeight: 500 }}>Contact</Button>
                    <Button sx={{ color: colors.white, fontWeight: 500 }}>Premium</Button>
                </Box>
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
        </div>
    )
}