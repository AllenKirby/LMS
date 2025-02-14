import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  message: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload; 
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
