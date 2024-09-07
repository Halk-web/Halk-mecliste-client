import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

interface CreatePostDto {
    title: string;
    description: string;
    image?: string;
    profile_id: any;
    liked_by?: any;
    disliked_by?: any;
}

// PostDto interface
interface PostDto {
    id?: string;
    title: string;
    description: string;
    image?: string;
    profile_id: any;
    profile?: any;
    liked_by?: any;
    disliked_by?: any;
}

// PostError interface
interface PostError {
    message: string;
}

export const createPostThunk=createAsyncThunk<PostDto,CreatePostDto,{rejectValue:PostError}>("/post/create",
    async (createPostDto:CreatePostDto,{rejectWithValue})=>{
        try{
            const response=await axios.post("/post/create",createPostDto);
            return response.data;
        }

        catch(error:any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

export const findAllThunk=createAsyncThunk<PostDto[],void,{rejectValue:PostError}>("/post/findAll",
    async (_,{rejectWithValue})=>{
        try{
            const response=await axios.get("/post/findAll");
            return response.data;
        }
        catch(error:any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

export const findOneByIdThunk=createAsyncThunk<PostDto,string,{rejectValue:PostError}>("/post/findOne",
    async (id,{rejectWithValue})=>{
        try{
            const response=await axios.get(`/post/findOne/${id}`);
            return response.data;
        }
        catch(error:any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

export const findByProfileIdThunk=createAsyncThunk<PostDto,string,{rejectValue:PostError}>("/post/findByProfileIdThunk",
    async (profile_id,{rejectWithValue})=>{
        try{
            const response=await axios.get(`/post/findByProfileId/${profile_id}`);
            return response.data;
        }
        catch(error:any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

export const searchPostThunk=createAsyncThunk<PostDto,string,{rejectValue:PostError}>("/post/findOne",
    async (title,{rejectWithValue})=>{
        try{
            const response=await axios.get(`/post/search/${title}`);
            return response.data;
        }
        catch(error:any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);



export const DeletePostThunk = createAsyncThunk<PostDto, string, { rejectValue: PostError}>(
    'post/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/post/delete/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

// Like post thunk
export const LikePostThunk = createAsyncThunk<PostDto, { post_id: string, profile_id: string }, { rejectValue: PostError }>(
    'post/like',
    async ({ post_id, profile_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/post/like', { post_id, profile_id });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);

// Dislike post thunk
export const DislikePostThunk = createAsyncThunk<PostDto, { post_id: string, profile_id: string }, { rejectValue: PostError }>(
    'post/dislike',
    async ({ post_id, profile_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/post/dislike', { post_id, profile_id });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'There is an unknown error!' });
        }
    }
);
