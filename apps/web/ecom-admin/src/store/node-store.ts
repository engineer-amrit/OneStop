import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import type { ApiError } from "common";
import type { NodeApi, Node } from "ecom";
import { NodeType as Nt } from "@schema/ecom";

// Define the initial state
interface NodeState {
    nodes: Node | null;
    loading: boolean;
    error: ApiError | null;
}

const initialState: NodeState = {
    nodes: null,
    loading: false,
    error: null,
};

// Create the asynchronous thunk
export const fetchNode = createAsyncThunk(
    "node/fetchNode",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<NodeApi>("/public/node/?type=GROUP&include=" + Nt.CATEGORY + "&include=" + Nt.BRAND);
            return response.data.nodes
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Create the slice
const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.nodes = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNode.fulfilled, (state, action) => {
                state.loading = false;
                state.nodes = action.payload
            })
            .addCase(fetchNode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as ApiError;
            });
    },
});

// Export actions and reducer
export const { clearUserData } = nodeSlice.actions;
export default nodeSlice.reducer;