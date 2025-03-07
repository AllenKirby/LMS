import { createSlice } from "@reduxjs/toolkit";

interface TrainingDataState {
  id: number;
  training_title: string;
  training_setup: string;
  start_date: string;
  end_date: string;
  venue: string;
  resource_speakers: {id: number; host_name: string}[];
  participants_display: {id: number; first_name: string; last_name: string; email: string}[];
  document_url: string[]
}

const initialState: TrainingDataState | null = null;

const ExternalTrainingData = createSlice({
  name: "externalTrainingData",
  initialState,
  reducers: {
    setData: (_, action) => action.payload,
    clearData: () => null,
  },
});

export const { setData, clearData } = ExternalTrainingData.actions;
export default ExternalTrainingData.reducer;
