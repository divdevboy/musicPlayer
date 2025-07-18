import {createSlice} from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
    name: 'player',
    initialState: {
        isPlaying: false,
        isShuffle: false,
        isRepeat: false,
        currentSongIndex: 0,
        progress: 0,
        duration: 0,
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
        setSongIndex: (state, action) => { state.currentSongIndex = action.payload },
        setDuration: (state, action) => { state.duration = action.payload },
        setSongList: (state, action) => { state.songList = action.payload },
    }
});

export const {togglePlay,toggleRepeat,toggleShuffle,play,setCurrentTime,setSongIndex} = PlayerSlice.actions;
export default PlayerSlice.reducer;