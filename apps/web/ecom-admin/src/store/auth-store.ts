import type { AuthUserDto, AuthUserResponseDto } from 'ecom'
import type { ApiError } from 'common';
import axiosInstance from '@/lib/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: AuthUserDto | null;
  loading: boolean;
  error: ApiError | null;
}


const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

// Create the asynchronous thunk
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    return await axiosInstance.get<AuthUserResponseDto>("/client")
      .then((response) => {
        return response.data.user;
      })
      .catch((error: ApiError) => {
        return rejectWithValue(error);
      });
  },
);

// Create the slice
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      });
  },
});

// Export actions and reducer
export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;

