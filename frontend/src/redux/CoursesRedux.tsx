import { createSlice } from "@reduxjs/toolkit";

import { CoursesState } from '../types/CourseCreationTypes'

const initialState: CoursesState[] = [];

const CoursesRedux = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (_, action) => action.payload,
    clearCourses: () => [],
    deleteCourseRedux: (state, action: { payload: number }) => {
      return state.filter(course => course.id !== action.payload);
    },
  },
});

export const { setCourses, clearCourses, deleteCourseRedux } = CoursesRedux.actions;
export default CoursesRedux.reducer;
