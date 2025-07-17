import {
    Box,
    IconButton,
    Slider,
    Typography,
    useMediaQuery,
    Card,
    CardMedia,
} from "@mui/material";
import {useEffect, useState, useRef} from "react";
import {
    Pause,
    PlayArrow,
    Repeat,
    SkipNext,
    SkipPrevious,
    ArrowBack, Shuffle
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {togglePlay, toggleRepeat, toggleShuffle} from "./redux/PlayerSlice.js";
import {useNavigate} from "react-router-dom";

const colors = {
    bg: '#23232a',
    cardBg: '#181818',
    pink: '#EE10B0',
    blue: '#0E9EEF',
    white: '#FFFFFF',
    gray: '#BEB8D8',
};


export default function NowPlaying() {
    const isPlaying = useSelector(state => state.player.isPlaying)
    const isRepeat = useSelector(state => state.player.isRepeat)
    const isShuffle = useSelector(state => state.player.isShuffle)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // --- State and logic (unchanged) ---
    let [btnColour, changeBtnColour] = useState("primary")
    let [progress, setProgress] = useState(0)
    const [durations, setDurations] = useState({});
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const playlist = [
        {
            title: "The Monster - Eminem ft. Rihanna",
            artist: "Eminem ft. Rihanna",
            album: "The Marshall Mathers LP 2",
            year: "2013",
            url: "https://dl.musicdel.ir/Music/1400/08/eminem_monster%20128.mp3",
            art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSns4cejxsvf4FKd83MgjBYRIxzoC0MrOl3FA&s"
        },
        {
            title: "A million years ago - adele",
            artist: "Adele",
            album: "25",
            year: "2015",
            url: "https://ts4.tarafdari.com/contents/user6984/content-sound/09_million_years_ago.mp3",
            art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOdknZooVNucBEQhOLoRYZtwTYd4HaZW82g&s"
        },
        {
            title: "Rahayam kon - Mohsen Chavoshi",
            artist: "Mohsen Chavoshi",
            album: "Single",
            year: "2023",
            url: "https://dls.musics-fa.com/tagdl/1402/Mohsen%20Chavoshi%20-%20Rahayam%20Kon%20(320).mp3",
            art: "https://upsong.ir/wp-content/uploads/2023/04/mohsen_chavoshi_az_on_jonon_che_khabar.jpg"
        }
    ];
    useEffect(() => {
        playlist.forEach((song, idx) => {
            const tempAudio = new Audio(song.url);
            tempAudio.addEventListener("loadedmetadata", () => {
                setDurations(prev => ({
                    ...prev,
                    [idx]: tempAudio.duration
                }));
            });
        });
    }, []);

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
        audio.onloadedmetadata = () => {
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

        changeBtnColour(btnColour === "primary" ? "secondary" : "primary");
        dispatch(togglePlay())
        if (!isPlaying) {
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

    // --- Layout ---
    const isMobile = useMediaQuery('(max-width:900px)');
    const currentSong = playlist[currentSongIndex];
    const upNext = playlist.filter((_, idx) => idx !== currentSongIndex);

    return (
        <Box sx={{
            width: '100vw',
            minHeight: '100dvh',
            overflow: 'hidden',
            background: `linear-gradient(120deg, #23232a 60%, #EE10B0 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            position: 'relative', // Needed for absolute positioning of back button
        }}>
            {/* Back Button at Top Left */}
            <Box sx={{
                position: 'absolute',
                top: 24,
                left: 24,
                zIndex: 10,
            }}>
                <IconButton
                    sx={{
                        background: colors.cardBg,
                        color: colors.pink,
                        boxShadow: '0 2px 8px 0 #181818',
                        '&:hover': { background: colors.pink, color: colors.white },
                        width: 64,
                        height: 64,
                    }}
                    // TODO: Add your navigation logic here, e.g., go back to previous page
                     onClick={() => { navigate('/') }}
                >
                    <ArrowBack sx={{ fontSize: 36 }} />
                </IconButton>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                maxWidth: 1100,
                mt: 6,
                mb: 4,
                gap: isMobile ? 4 : 8,
            }}>
                {/* Album Art */}
                <Box sx={{
                    flex: '0 0 340px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: isMobile ? 3 : 0,
                }}>
                    <Card sx={{
                        width: 280,
                        height: 280,
                        borderRadius: 6,
                        boxShadow: '0 4px 32px 0 #181818',
                        background: colors.cardBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CardMedia
                            component="img"
                            image={currentSong.art}
                            alt="Album Art"
                            sx={{ width: 260, height: 260, borderRadius: 4 }}
                        />
                    </Card>
                </Box>

                {/* Song Info & Playlist */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    justifyContent: 'center',
                    minWidth: 300,
                }}>
                    {/* 'MEDUZA' is a static, faded heading for visual effect. You can change this to display the current artist, album, or playlist name if you prefer. */}
                    <Typography variant="h2" sx={{
                        color: colors.gray,
                        fontWeight: 700,
                        letterSpacing: 8,
                        opacity: 0.15,
                        mb: 0,
                        fontSize: isMobile ? 40 : 72,
                        textAlign: isMobile ? 'center' : 'left',
                    }}>
                        MEDUZA
                    </Typography>
                    <Typography variant="h4" sx={{ color: colors.white, fontWeight: 700, mb: 1, mt: -6 }}>
                        {currentSong.title.split(' - ')[0]}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: colors.gray, mb: 1 }}>
                        {currentSong.artist} &bull; {currentSong.album} &bull; {currentSong.year}
                    </Typography>
                    {/* Rating (static for now) */}
                    <Typography variant="h5" sx={{ color: colors.pink, fontWeight: 700, mb: 2 }}>
                        4.5<span style={{ fontSize: 18 }}>/5</span>
                    </Typography>

                    {/* Playlist (Up Next) */}
                    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                        <Box sx={{
                            background: colors.cardBg,
                            borderRadius: 2,
                            p: 2,
                            minWidth: 260,
                        }}>
                            {playlist.map((song, idx) => (
                                <Box key={song.title} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: idx === currentSongIndex ? colors.pink : 'transparent',
                                    color: idx === currentSongIndex ? colors.white : colors.gray,
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    mb: 1,
                                    fontWeight: idx === currentSongIndex ? 700 : 400,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'}} onClick={()=>{setCurrentSongIndex(idx)}}>
                                    <Typography variant="body1" sx={{ fontWeight: 'inherit' }}>
                                        {idx + 1}. {song.title.split(' - ')[0]}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
                                        {durations[idx] ? formatTime(durations[idx]) : "--:--"}
                                    </Typography>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Controls & Progress Bar */}
            <Box sx={{
                width: '100%',
                maxWidth: 700,
                background: colors.cardBg,
                borderRadius: 4,
                boxShadow: '0 2px 16px 0 #181818',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
            }}>
                {/* Time & Progress */}
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.gray, fontWeight: 700 }}>
                        {formatTime(progress)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.gray, fontWeight: 700 }}>
                        {formatTime(duration)}
                    </Typography>
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
                        mb: 2,
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
                {/* Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 1 }}>
                    <IconButton  onClick={prevSong}  sx={{ color: colors.white }}>
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
                            width: 64,
                            height: 64,
                            '&:hover': {
                                background: colors.pink,
                                color: colors.white,
                            },
                            fontSize: 36,
                            transition: 'all 0.2s',
                        }}
                    >
                        {isPlaying ? <Pause sx={{ fontSize: 36 }} /> : <PlayArrow sx={{ fontSize: 36 }} />}
                    </IconButton>
                    <IconButton  onClick={nextSong} sx={{ color: colors.white }}>
                        <SkipNext />
                    </IconButton>
                    <IconButton  onClick={() => dispatch(toggleRepeat())}  sx={{ color: isRepeat ? colors.pink : colors.gray }}>
                        <Repeat />
                    </IconButton>
                    <IconButton onClick={() => dispatch(toggleShuffle()) } sx={{ color: isShuffle ? colors.pink : colors.gray }}>
                        <Shuffle />
                    </IconButton>

                </Box>
            </Box>
            {/* Audio element (hidden) */}
            <audio ref={audioRef} src={url} />
        </Box>
    );
}