import { createSlice } from "@reduxjs/toolkit";

 interface Trainees {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  department: string;
  birth_date: string;
  contact: string;
  address: string;
}

export interface TraineesState {
  trainees: Trainees[]
}

const initialState: TraineesState = { trainees: [] };

const TraineesSlice = createSlice({
  name: "trainees",
  initialState,
  reducers: {
    setTrainees: (_, action) => action.payload,
    clearTrainees: (state) =>{ state.trainees = []},
  },
});

export const { setTrainees, clearTrainees } = TraineesSlice.actions;
export default TraineesSlice.reducer;
