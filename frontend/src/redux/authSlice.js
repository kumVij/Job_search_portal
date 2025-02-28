import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user || null;
    } catch (error) {
        console.error("Error reading user from localStorage:", error);
        return null;
    }
};

const initialState = {
    loading: false,
    user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save user
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user"); // ✅ Clear user on logout
        }
    }
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
