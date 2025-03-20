import { createSlice } from "@reduxjs/toolkit";
import { TrainingDataState } from '../types/CourseCreationTypes'

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
