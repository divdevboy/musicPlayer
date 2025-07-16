import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, InputBase, Card, CardMedia, CardContent, Avatar, Divider, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import heroImg from './assets/hero.png';
import { Divider as MuiDivider } from '@mui/material';

// Color palette from Figma
const colors = {
  bg: '#181818',
  pink: '#EE10B0',
  pinkHover: '#D0609E',
  pinkSelected: '#BE0D8D',
  blue: '#0E9EEF',
  blueHover: '#0D8ED7',
  blueSelected: '#0B7EBF',
  white: '#FFFFFF',
  gray: '#FDCFF7',
  cardBg: '#23232a',
  textGray: '#BEB8D8',
};

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

const weeklySongs = [
  { title: 'Whatever It Takes', artist: 'Imagine Dragons', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'Skyfall', artist: 'Adele', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'Superman', artist: 'Eminem', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'Softcore', artist: 'The Neighborhood', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'The Loneliest', artist: 'Måneskin', img: 'https://via.placeholder.com/120x120?text=Album' },
];

const newReleases = [
  { title: 'TIME', artist: 'Artist', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: '112', artist: 'Artist', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'We Don\'t Care', artist: 'Artist', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'What I Am', artist: 'Artist', img: 'https://via.placeholder.com/120x120?text=Album' },
  { title: 'Brave', artist: 'Artist', img: 'https://via.placeholder.com/120x120?text=Album' },
];

const sidebarSections = [
  { title: 'Menu', items: navItems.slice(0, 4) },
  { title: 'Library', items: navItems.slice(4, 6) },
  { title: 'Playlist and favorite', items: navItems.slice(6, 8) },
];

const Home = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      {/* Sidebar */}
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
            <Box key={section.title} sx={{ mb: 2 }}>
              <Typography sx={{
                color: colors.textGray,
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                px: 3,
                mb: 0.5,
                mt: i === 0 ? 0 : 2,
                textAlign: 'center',
              }}>{section.title}</Typography>
              <List sx={{ width: '100%' }}>
                {section.items.map((item, idx) => (
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
        {/* Vertical pink divider */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 3,
          height: '100%',
          bgcolor: colors.pink,
          borderRadius: '6px',
        }} />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        {/* Main Sections */}
        <Box sx={{ flex: 1, p: 4, background: colors.bg }}>
          {/* Hero Section */}
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
            {/* Header Row (moved from AppBar) */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 0, mt: 0 }}>
              {/* Search Bar */}
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
              {/* Nav Links */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 6 }}>
                <Button sx={{ color: colors.white, fontWeight: 500 }}>About Us</Button>
                <Button sx={{ color: colors.white, fontWeight: 500 }}>Contact</Button>
                <Button sx={{ color: colors.white, fontWeight: 500 }}>Premium</Button>
              </Box>
              {/* Auth Buttons */}
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
            {/* Hero Content */}
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

          {/* Weekly Top Songs */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: colors.white, fontSize: 32 }}>
                Weekly Top{' '}
                <Box component="span" sx={{ color: colors.pink }}>
                  Songs
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
                      boxShadow: `0 0 16px 2px ${colors.pink}`,
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

          {/* New Release Songs */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: colors.white, fontSize: 32 }}>
                New Release{' '}
                <Box component="span" sx={{ color: colors.pink }}>
                  Songs
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
              {newReleases.map((song, idx) => (
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
                      boxShadow: `0 0 16px 2px ${colors.blue}`,
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
        </Box>
      </Box>
    </Box>
  );
};

export default Home; 