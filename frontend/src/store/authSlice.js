import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            if (action.payload === null) {
                state.user = null;
            } else {
                state.user = { ...action.payload };
            }
        }
    }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;