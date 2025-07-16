import React from 'react';
import { Drawer, Box, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider as MuiDivider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NavItem from "../NavItem";


const navItems = [
    { label: 'Home', icon: <HomeIcon />, active: true },
    { label: 'Discover', icon: <SearchIcon /> },
    { label: 'Albums', icon: <AlbumIcon /> },
    { label: 'Artists', icon: <PersonIcon /> },
    { label: 'Recently Added', icon: <QueueMusicIcon /> },
    { label: 'Most Played', icon: <FavoriteIcon /> },
    { label: 'Your Favorites', icon: <FavoriteIcon /> },
    { label: 'Add Playlist', icon: <PlaylistAddIcon />, accent: true },
];

const bottomNav = [
    { label: 'Setting', icon: <SettingsIcon /> },
    { label: 'Logout', icon: <LogoutIcon />, accent: true },
];

const sidebarSections = [
    { title: 'Menu', items: navItems.slice(0, 4) },
    { title: 'Library', items: navItems.slice(4, 6) },
    { title: 'Playlist and favorite', items: navItems.slice(6, 8) },
];

const Sidebar = ({colors}) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: '15vw',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '15vw',
                    boxSizing: 'border-box',
                    background: colors.bg,
                    color: colors.white,
                    borderRight: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                },
            }}
        >
            <Box>
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: colors.pink, width: 40, height: 40 }}>M</Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.pink }}>
                        Melodies
                    </Typography>
                </Box>
                {sidebarSections.map((section, i) => (
                    <NavItem colors={colors} section={section} index={i}/>
                ))}
            </Box>
            <Box>
                <MuiDivider sx={{ bgcolor: '#23232a', my: 2 }} />
                <List sx={{ width: '100%' }}>
                    {bottomNav.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            sx={{
                                borderRadius: 2,
                                color: item.accent ? colors.pink : colors.gray,
                                '&:hover': {
                                    background: '#23232a',
                                },
                                width: '100%',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 3,
                    height: '100%',
                    bgcolor: colors.pink,
                    borderRadius: '6px',
                }}
            />
        </Drawer>
    );
};

export default Sidebar;
