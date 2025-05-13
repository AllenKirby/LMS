import { createSlice } from "@reduxjs/toolkit";
import { TrainingDataState } from '../types/CourseCreationTypes'

const initialState: TrainingDataState[] = [];

const ExternalTrainingData = createSlice({
  name: "externalTrainingData",
  initialState,
  reducers: {
    setData: (_, action) => action.payload,
    clearData: () => [],
    deleteTrainingRedux: (state, action: { payload: number }) => {
      return state.filter(training => training.id !== action.payload);
    },
  },
});

export const { setData, clearData, deleteTrainingRedux } = ExternalTrainingData.actions;
export default ExternalTrainingData.reducer;
