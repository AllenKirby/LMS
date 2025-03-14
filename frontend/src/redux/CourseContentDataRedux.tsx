import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CourseContentState } from '../types/CourseCreationTypes'

const initialState: CourseContentState[] = [];

const CourseContentDataRedux = createSlice({
  name: "courseContent",
  initialState,
  reducers: {
    setMenus: (_, action: PayloadAction<CourseContentState[]>) => action.payload, 
    setMenu: (state, action: PayloadAction<CourseContentState>) => {
      state.push(action.payload); 
    },
    resetCourseContent: () => initialState
  },
});

export const { setMenus, setMenu, resetCourseContent } = CourseContentDataRedux.actions;
export default CourseContentDataRedux.reducer;
