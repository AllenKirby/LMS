import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MenuDataState } from '../types/CourseCreationTypes'

const initialState: MenuDataState[] = [];

const CourseContentDataRedux = createSlice({
  name: "courseContent",
  initialState,
  reducers: {
    setMenus: (_, action: PayloadAction<MenuDataState[]>) => action.payload, 
    setMenu: (state, action: PayloadAction<MenuDataState>) => {
      state.push(action.payload); 
    },
    removeMenu: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload); 
    },
    resetCourseContent: () => initialState
  },
});

export const { setMenus, setMenu, resetCourseContent, removeMenu } = CourseContentDataRedux.actions;
export default CourseContentDataRedux.reducer;
