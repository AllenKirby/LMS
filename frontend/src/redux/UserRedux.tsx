import { createSlice } from "@reduxjs/toolkit";

 interface User {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  birth_date: string;
  contact: string;
  address: string;
}

export interface UserState {
  message: string;
  user: User;
  access_token?: string;
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
