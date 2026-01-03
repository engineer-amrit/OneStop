import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

type UserType = {
  _id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: {
    streetAddress1: string;
    streetAddress2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    useAsDeliveryAddress: boolean;
  }[];
  role: "ADMIN" | "USER" | "VENDOR";
  isVerified: boolean;
};

interface ErrorType {
  status: number;
  message: string;
  extraDetails: string;
}

// Define the initial state
interface UserState {
  user: UserType | null;
  loading: boolean;
  error: ErrorType | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Create the asynchronous thunk
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user-data");

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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
        state.user = action.payload as UserType;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorType;
      });
  },
});

// Export actions and reducer
export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;
