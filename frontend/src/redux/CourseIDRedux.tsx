import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const CourseIDRedux = createSlice({
  name: "courseID",
  initialState,
  reducers: {
    setID: (_, action: PayloadAction<number>) => action.payload,
    resetCourseID: () => initialState
  },
});

export const { setID, resetCourseID } = CourseIDRedux.actions;
export default CourseIDRedux.reducer;
