import { createSlice } from "@reduxjs/toolkit";

import { CoursesState } from '../types/CourseCreationTypes'

const initialState: CoursesState | null = null;

const CoursesRedux = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (_, action) => action.payload,
    clearCourses: () => null,
  },
});

export const { setCourses, clearCourses } = CoursesRedux.actions;
export default CoursesRedux.reducer;
