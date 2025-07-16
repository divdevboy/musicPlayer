import {Box, IconButton, Slider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Pause, PlayArrow, Repeat, Shuffle, SkipNext, SkipPrevious} from "@mui/icons-material";
import {useRef} from "react";

export default function NowPlaying() {
    let [btnColour, changeBtnColour] = useState("primary")
    let [isPlaying, setIsPlaying] = useState(false)
    let [progress, setProgress] = useState(0)
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const playlist = [
        {
            title: "The Monster - Eminem ft. Rihanna",
            url: "https://dl.musicdel.ir/Music/1400/08/eminem_monster%20128.mp3"
        },
        {
            title: "A million years ago - adele",
            url: "https://ts4.tarafdari.com/contents/user6984/content-sound/09_million_years_ago.mp3"
        },
        {
            title: "Rahayam kon - Mohsen Chavoshi",
            url: "https://dls.musics-fa.com/tagdl/1402/Mohsen%20Chavoshi%20-%20Rahayam%20Kon%20(320).mp3"
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
            // to remove listener
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);

        }
    }, [isRepeat, isShuffle, currentSongIndex, playlist.length]);
    useEffect(() => {
        if (!audioRef.current) return;

        // Load new song when index changes
        audioRef.current.load();

        // Autoplay if already playing
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


    return (<div>
            <Box sx={{mt: 2, width: "70%", mx: "auto", textAlign: "center"}}>
                <IconButton onClick={() => setIsRepeat(!isRepeat)} color={isRepeat ? "primary" : "default"}>
                    <Repeat />
                </IconButton>

                <IconButton onClick={() => setIsShuffle(!isShuffle)} color={isShuffle ? "primary" : "default"}>
                    <Shuffle />
                </IconButton>


                <IconButton onClick={prevSong}>
                    <SkipPrevious />
                </IconButton>

                <IconButton color={btnColour} onClick={practiceClicked} sx={{mb: 2}}>
                    {isPlaying ? <Pause/> : <PlayArrow/>}
                </IconButton>

                <IconButton onClick={nextSong}>
                    <SkipNext />
                </IconButton>
                <Slider value={progress} onChange={(e, newValue) => {
                    setProgress(newValue)
                    audioRef.current.currentTime = newValue
                }} max={audioRef.current?.duration || 100}/>
                <Typography variant={"h6"} sx={{mt: 2}}>{formatTime(progress)} / {formatTime(duration)}</Typography>
                <audio ref={audioRef} src={url}/>

            </Box>
        </div>
    )

}