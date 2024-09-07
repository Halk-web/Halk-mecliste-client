import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPostThunk, DeletePostThunk, DislikePostThunk, findAllThunk, findByProfileIdThunk, findOneByIdThunk, LikePostThunk } from "../Thunk/PostThunk";

interface PostState {
    loading: boolean;
    error: null | string;
    posts: any[];
    post: any | null;
}

const initialState: PostState = {
    loading: false,
    error: null,
    posts: [],
    post: null
};

const postReducer = createSlice({
    name: "posts",
    reducers: {},
    initialState: initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createPostThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(createPostThunk.fulfilled, (state, action: PayloadAction<any>) => {
            console.log("Action payload=",action.payload);
            state.posts.push(action.payload);
            state.loading = false;
        })
        .addCase(createPostThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(findAllThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(findAllThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(findAllThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(findOneByIdThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(findOneByIdThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.post = action.payload;
            state.loading = false;
        })
        .addCase(findOneByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(findByProfileIdThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(findByProfileIdThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(findByProfileIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(DeletePostThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(DeletePostThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.posts = state.posts.filter((post: any) => post.id !== action.payload);
            state.loading = false;
        })
        .addCase(DeletePostThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(LikePostThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(LikePostThunk.fulfilled, (state, action: PayloadAction<any>) => {
            console.log("payload",action.payload);
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
            state.loading = false;
        })
        .addCase(LikePostThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message || 'Failed to like post';
        })

        .addCase(DislikePostThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        
        .addCase(DislikePostThunk.fulfilled, (state, action: PayloadAction<any>) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
            state.loading = false;
        })
        .addCase(DislikePostThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message || 'Failed to dislike post';
        });
    }
});

export default postReducer.reducer;
