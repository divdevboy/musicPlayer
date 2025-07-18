import React, {useState, useRef, useEffect} from "react";
import {Box, IconButton, Typography, Card, CardMedia} from "@mui/material";
import {PlayArrow, Pause, SkipNext, SkipPrevious} from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import { setCurrentSongIndex, setCurrentTime, togglePlay} from "../redux/PlayerSlice.js";

const colors = {
    bg: '#181818',
    pink: '#EE10B0',
    blue: '#0E9EEF',
    white: '#FFFFFF',
    gray: '#BEB8D8',
    cardBg: '#23232a',
};

const playlist = [
    {
        title: "The Monster",
        artist: "Eminem ft. Rihanna",
        url: "https://dl.musicdel.ir/Music/1400/08/eminem_monster%20128.mp3",
        art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSns4cejxsvf4FKd83MgjBYRIxzoC0MrOl3FA&s"
    },
    {
        title: "A million years ago",
        artist: "Adele",
        url: "https://ts4.tarafdari.com/contents/user6984/content-sound/09_million_years_ago.mp3",
        art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOdknZooVNucBEQhOLoRYZtwTYd4HaZW82g&s"
    },
    {
        title: "Rahayam kon",
        artist: "Mohsen Chavoshi",
        url: "https://dls.musics-fa.com/tagdl/1402/Mohsen%20Chavoshi%20-%20Rahayam%20Kon%20(320).mp3",
        art: "https://upsong.ir/wp-content/uploads/2023/04/mohsen_chavoshi_az_on_jonon_che_khabar.jpg"
    }
];

export default function MiniPlayer({onclick}) {
    const currentSongIndex = useSelector(state => state.player.currentSongIndex);
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.player.isPlaying);
    const audioRef = useRef(null);
    const progress = useSelector(state => state.player.progress)

    //   const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const currentSong = playlist[currentSongIndex];

    // Restore progress from Redux only on initial mount
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = progress;
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = progress;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play();
        }
        dispatch(setCurrentTime(0));
    }, [currentSongIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateProgress = () => dispatch(setCurrentTime(audio.currentTime));
        const setAudioDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            handleNext();
        };
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", setAudioDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong.url]);

    function handlePlayPause() {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        dispatch(togglePlay());
    }

    function handleNext() {
        const nextIndex = (currentSongIndex + 1) % playlist.length;
        dispatch(setCurrentSongIndex(nextIndex))
        dispatch(setCurrentTime(0));
    }

    function handlePrev() {
        const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        dispatch(setCurrentSongIndex(prevIndex))
        dispatch(setCurrentTime(0));
    }

    function handleSliderChange(e, value) {
        dispatch(setCurrentTime(value));
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    }

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 2000,
            boxShadow: '0 4px 32px 0 #181818',
        }}>
            <Card sx={{
                width: 320,
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: colors.cardBg,
                borderRadius: 4,
                px: 2,
                py: 1,
            }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <CardMedia
                        component="img"
                        image={currentSong.art}
                        alt="Album Art"
                        sx={{width: 64, height: 64, borderRadius: 2, mr: 2}}
                    />
                    <Box sx={{flex: 1, minWidth: 0}} onClick={onclick}>
                        <Typography variant="subtitle1" sx={{
                            color: colors.white,
                            fontWeight: 700,
                            fontSize: 18,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {currentSong.title}
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: colors.gray,
                            fontSize: 14,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {currentSong.artist}
                        </Typography>
                    </Box>
                </Box>
                {/* Progress Bar */}
                <Slider
                    value={progress}
                    min={0}
                    max={duration || 100}
                    step={1}
                    onChange={handleSliderChange}
                    sx={{
                        color: colors.pink,
                        height: 4,
                        mt: 1,
                        mb: 0.5,
                        '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            backgroundColor: colors.white,
                            border: `2px solid ${colors.pink}`,
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.3,
                            backgroundColor: colors.gray,
                        },
                    }}
                />
                {/* Controls */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0}}>
                    <IconButton onClick={handlePrev} sx={{color: colors.white}}>
                        <SkipPrevious/>
                    </IconButton>
                    <IconButton onClick={handlePlayPause} sx={{color: isPlaying ? colors.pink : colors.white}}>
                        {isPlaying ? <Pause/> : <PlayArrow/>}
                    </IconButton>
                    <IconButton onClick={handleNext} sx={{color: colors.white}}>
                        <SkipNext/>
                    </IconButton>
                </Box>
                <audio ref={audioRef} src={currentSong.url}/>
            </Card>
        </Box>
    );
}