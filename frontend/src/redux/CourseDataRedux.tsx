import { createSlice } from "@reduxjs/toolkit";

interface CourseData {
    cover_image: string,
    course_title: string;
    course_description: string;
    department: 'IT' | 'EOD' | 'AFD' | 'RIM' | 'EMU' | '';
    visibility: 'public' | 'private' | '';
  }

const initialState: CourseData | null = null;

const CourseDataSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {
    setData: (_, action) => action.payload
  },
});

export const { setData } = CourseDataSlice.actions;
export default CourseDataSlice.reducer;
