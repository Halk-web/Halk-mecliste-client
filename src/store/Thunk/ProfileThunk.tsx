import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

interface UpdateProfileDto {
    id: string;
    profile_img?: string;
    city?:string;
    party?:string;
    politicalView?:string;    
}

// ProfileDto interface
interface ProfileDto {
    id: string;
    profile_img?: string;
    city?:string;
    party?:string;
    politicalView?:string; 
}

// ProfileError interface
interface ProfileError {
    message: string;
}

export const updateProfileThunk = createAsyncThunk<ProfileDto, UpdateProfileDto, { rejectValue: ProfileError }>(
    "/profile/update",
    async (updateProfileDto: UpdateProfileDto, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/profile/update/${updateProfileDto.id}`, updateProfileDto);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);
