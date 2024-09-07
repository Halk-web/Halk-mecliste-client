import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfileThunk } from "../Thunk/ProfileThunk"; // Güncellemen gerekebilir

type ProfileProps={
    id?:string;
    profile_img?:string;
    gender?:string;
    politicalView:string;
    city?:string;
    party?:string;
}

interface ProfileState {
    loading: boolean;
    error: null | string;
    profile:ProfileProps |null;
}

const initialState: ProfileState = {
    loading: false,
    error: null,
    profile: null,
};

const profileReducer = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(updateProfileThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});



export default profileReducer.reducer;
