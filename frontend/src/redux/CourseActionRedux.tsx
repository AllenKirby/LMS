import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CourseActionType } from '../types/CourseCreationTypes'

const initialState: CourseActionType = '';

const courseActionSlice = createSlice({
  name: "courseAction",
  initialState,
  reducers: {
    setAction: (_, action: PayloadAction<CourseActionType>) => action.payload,
    resetAction: () => initialState,
  },
});

export const { setAction, resetAction } = courseActionSlice.actions;
export default courseActionSlice.reducer;
