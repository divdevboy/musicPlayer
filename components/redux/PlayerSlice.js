import {createSlice} from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
    name: 'player',
    initialState: {
        isPlaying: false,
        isShuffle: false,
        isRepeat: false,
        currentSongIndex: 0,
        progress: 0,
        songList: [
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
        ]
    },
    reducers: {
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        play:(state) =>{
            state.isPlaying = true
        },
        toggleShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
        },
        toggleRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
        },
        setCurrentTime: (state, action) => { state.progress = action.payload },
        setCurrentSongIndex: (state, action) => { state.currentSongIndex = action.payload },
        setSongList: (state, action) => { state.songList = action.payload },
    }
});

export const {togglePlay,toggleRepeat,toggleShuffle,play,setCurrentTime,setCurrentSongIndex} = PlayerSlice.actions;
export default PlayerSlice.reducer;