import {createSlice} from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
    name: 'player',
    initialState: {
        isPlaying: false,
        isShuffle: false,
        isRepeat: false
    },
    reducers: {
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        }
        ,
        toggleShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
        },
        toggleRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
        }
    }
});

export const {togglePlay,toggleRepeat,toggleShuffle} = PlayerSlice.actions;
export default PlayerSlice.reducer;