import {Box, IconButton, Slider, Typography, useMediaQuery, Avatar, Stack, Card, CardContent, CardMedia, Button} from "@mui/material";
import {useEffect, useState, useRef} from "react";
import {Pause, PlayArrow, Repeat, Shuffle, SkipNext, SkipPrevious, FavoriteBorder, Share, PlaylistAdd} from "@mui/icons-material";

const colors = {
  bg: '#23232a',
  cardBg: '#181818',
  pink: '#EE10B0',
  blue: '#0E9EEF',
  white: '#FFFFFF',
  gray: '#BEB8D8',
};

const placeholderArt = 'https://via.placeholder.com/240x240?text=Album+Art';

export default function NowPlaying() {
    let [btnColour, changeBtnColour] = useState("primary")
    let [isPlaying, setIsPlaying] = useState(false)
    let [progress, setProgress] = useState(0)
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const playlist = [
        {
            title: "The Monster - Eminem ft. Rihanna",
            artist: "Eminem ft. Rihanna",
            album: "The Marshall Mathers LP 2",
            year: "2013",
            url: "https://dl.musicdel.ir/Music/1400/08/eminem_monster%20128.mp3",
            art: placeholderArt
        },
        {
            title: "A million years ago - adele",
            artist: "Adele",
            album: "25",
            year: "2015",
            url: "https://ts4.tarafdari.com/contents/user6984/content-sound/09_million_years_ago.mp3",
            art: placeholderArt
        },
        {
            title: "Rahayam kon - Mohsen Chavoshi",
            artist: "Mohsen Chavoshi",
            album: "Single",
            year: "2023",
            url: "https://dls.musics-fa.com/tagdl/1402/Mohsen%20Chavoshi%20-%20Rahayam%20Kon%20(320).mp3",
            art: placeholderArt
        }
    ];
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const audioRef = useRef(null);
    const url = playlist[currentSongIndex].url;
    const [duration, setDuration] = useState(0);
    function nextSong() {
        const nextIndex = (currentSongIndex + 1) % playlist.length;
        setCurrentSongIndex(nextIndex);
        setProgress(0);
    }
    function prevSong() {
        const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        setCurrentSongIndex(prevIndex);
        setProgress(0);
    }
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return;
        audio.onloadedmetadata = ()=>{
        setDuration(audio.duration)
        }
        function updateProgress() {
            setProgress(audio.currentTime);
        }
        function handleEnded() {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else if (isShuffle) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * playlist.length);
                } while (randomIndex === currentSongIndex);
                setCurrentSongIndex(randomIndex);
            } else {
                nextSong();
            }
        }
        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("ended", handleEnded);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        }
    }, [isRepeat, isShuffle, currentSongIndex, playlist.length]);
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play();
        }
        setProgress(0);
    }, [currentSongIndex]);
    function practiceClicked() {
        const nextState = !isPlaying;
        changeBtnColour(btnColour === "primary" ? "secondary" : "primary");
            setIsPlaying(nextState);
            if (nextState) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
    }
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    const isMobile = useMediaQuery('(max-width:900px)');
    const currentSong = playlist[currentSongIndex];
    // Up Next (queue)
    const upNext = playlist.filter((_, idx) => idx !== currentSongIndex);
    return (
        <Box sx={{
            mt: 4,
            mb: 4,
            width: isMobile ? '98%' : '900px',
            mx: 'auto',
            background: 'transparent',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: isMobile ? 3 : 5,
        }}>
            {/* Album Art & Visualizer */}
            <Box sx={{
                width: isMobile ? '100%' : 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: isMobile ? 2 : 0,
            }}>
                <Card sx={{
                    width: 240,
                    height: 240,
                    borderRadius: 6,
                    boxShadow: '0 4px 32px 0 #181818',
                    mb: 2,
                    background: colors.cardBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CardMedia
                        component="img"
                        image={currentSong.art}
                        alt="Album Art"
                        sx={{ width: 220, height: 220, borderRadius: 4 }}
                    />
                </Card>
                {/* Visualizer Placeholder */}
                <Box sx={{ width: 120, height: 32, display: 'flex', alignItems: 'flex-end', gap: 0.5, mb: 2 }}>
                    {[8, 16, 24, 32, 24, 16, 8].map((h, i) => (
                        <Box key={i} sx={{ width: 8, height: h, borderRadius: 2, background: colors.pink, opacity: 0.5 + 0.5 * Math.abs(3 - i) / 3, animation: `barAnim 1s ${i * 0.1}s infinite alternate` }} />
                    ))}
                </Box>
                {/* Visualizer Animation Keyframes */}
                <style>{`
                @keyframes barAnim {
                  0% { transform: scaleY(1); }
                  100% { transform: scaleY(1.5); }
                }
                `}</style>
            </Box>
            {/* Main Player Card */}
            <Box sx={{
                flex: 1,
                background: colors.bg,
                borderRadius: 4,
                boxShadow: '0 4px 32px 0 #181818',
                p: isMobile ? 2 : 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 320,
                width: '100%',
            }}>
                <Typography variant="h6" sx={{ color: colors.pink, fontWeight: 700, mb: 1, fontSize: 20, textAlign: 'center' }}>
                    Now Playing
                </Typography>
                <Typography variant="subtitle1" sx={{ color: colors.white, fontWeight: 600, mb: 1, fontSize: 18, textAlign: 'center', maxWidth: '90%' }}>
                    {currentSong.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray, mb: 2, textAlign: 'center' }}>
                    {currentSong.artist} &bull; {currentSong.album} &bull; {currentSong.year}
                </Typography>
                {/* User Actions */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <IconButton sx={{ color: colors.pink }}><FavoriteBorder /></IconButton>
                    <IconButton sx={{ color: colors.blue }}><Share /></IconButton>
                    <IconButton sx={{ color: colors.gray }}><PlaylistAdd /></IconButton>
                </Box>
                {/* Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 1 : 2, mb: 2 }}>
                    <IconButton onClick={() => setIsRepeat(!isRepeat)} sx={{ color: isRepeat ? colors.pink : colors.gray }}>
                        <Repeat />
                    </IconButton>
                    <IconButton onClick={() => setIsShuffle(!isShuffle)} sx={{ color: isShuffle ? colors.blue : colors.gray }}>
                        <Shuffle />
                    </IconButton>
                    <IconButton onClick={prevSong} sx={{ color: colors.white }}>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton
                        color={btnColour}
                        onClick={practiceClicked}
                        sx={{
                            mx: 1,
                            background: isPlaying ? colors.pink : colors.cardBg,
                            color: isPlaying ? colors.white : colors.pink,
                            boxShadow: isPlaying ? `0 0 16px 2px ${colors.pink}` : 'none',
                            width: isMobile ? 56 : 72,
                            height: isMobile ? 56 : 72,
                            '&:hover': {
                                background: colors.pink,
                                color: colors.white,
                            },
                            fontSize: isMobile ? 32 : 40,
                            transition: 'all 0.2s',
                        }}
                    >
                        {isPlaying ? <Pause sx={{ fontSize: isMobile ? 32 : 40 }} /> : <PlayArrow sx={{ fontSize: isMobile ? 32 : 40 }} />}
                    </IconButton>
                    <IconButton onClick={nextSong} sx={{ color: colors.white }}>
                        <SkipNext />
                    </IconButton>
                </Box>
                <Slider
                    value={progress}
                    onChange={(e, newValue) => {
                        setProgress(newValue)
                        audioRef.current.currentTime = newValue
                    }}
                    max={audioRef.current?.duration || 100}
                    sx={{
                        color: colors.pink,
                        height: 6,
                        borderRadius: 2,
                        mb: 1,
                        '& .MuiSlider-thumb': {
                            width: 18,
                            height: 18,
                            backgroundColor: colors.white,
                            border: `2px solid ${colors.pink}`,
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.3,
                            backgroundColor: colors.gray,
                        },
                    }}
                />
                <Typography variant={"body2"} sx={{ color: colors.gray, mb: 2, fontWeight: 500 }}>
                    {formatTime(progress)} / {formatTime(duration)}
                </Typography>
                {/* Lyrics/Info Placeholder */}
                <Box sx={{
                    background: colors.cardBg,
                    borderRadius: 2,
                    p: 2,
                    width: '100%',
                    minHeight: 60,
                    mb: 2,
                }}>
                    <Typography variant="body2" sx={{ color: colors.gray, textAlign: 'center' }}>
                        Lyrics or song info will appear here...
                    </Typography>
                </Box>
                {/* Up Next / Queue */}
                <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ color: colors.pink, fontWeight: 700, mb: 1 }}>
                        Up Next
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                        {upNext.map((song, idx) => (
                            <Card key={song.title} sx={{ minWidth: 120, maxWidth: 120, background: colors.cardBg, borderRadius: 2, boxShadow: '0 2px 8px 0 #181818' }}>
                                <CardMedia
                                    component="img"
                                    image={song.art}
                                    alt="Album Art"
                                    sx={{ height: 60, borderRadius: 2 }}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" sx={{ color: colors.white, fontWeight: 600, fontSize: 14, mb: 0.5, textAlign: 'center' }} noWrap>
                                        {song.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: colors.gray, textAlign: 'center' }} noWrap>
                                        {song.artist}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
                <audio ref={audioRef} src={url}/>
            </Box>
        </Box>
    )
}