import {Box, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import React from "react";

export default function NavItem({section,colors,index}){
    return(
        <Box key={section.title} sx={{ mb: 2 }}>
            <Typography
                sx={{
                    color: colors.textGray,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    px: 3,
                    mb: 0.5,
                    mt: index === 0 ? 0 : 2,
                    textAlign: 'center',
                }}
            >
                {section.title}
            </Typography>
            <List sx={{ width: '100%' }}>
                {section.items.map((item) => (
                    <ListItem
                        button
                        key={item.label}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            background: item.active
                                ? colors.pink
                                : item.accent
                                    ? colors.blue
                                    : 'transparent',
                            color: item.active || item.accent ? colors.white : colors.gray,
                            boxShadow: item.active
                                ? `0 0 8px 2px ${colors.pink}`
                                : item.accent
                                    ? `0 0 8px 2px ${colors.blue}`
                                    : 'none',
                            '&:hover': {
                                background: item.active
                                    ? colors.pinkHover
                                    : item.accent
                                        ? colors.blueHover
                                        : '#23232a',
                            },
                            width: '100%',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontWeight: item.active ? 700 : 500 }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}