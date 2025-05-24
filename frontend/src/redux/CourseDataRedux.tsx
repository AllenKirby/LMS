import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CourseData } from "../types/CourseCreationTypes";
import { SignupState } from "../types/UserTypes";

const initialState: CourseData = {
  id: 0,
  cover_image_upload: null,
  cover_image_url: "",
  course_title: "",
  course_description: "",
  department: [],
  visibility: "",
  participants: [],
  submitted: false,
};

type UpdateFieldPayload =
  | { name: "course_title"; value: string }
  | { name: "course_description"; value: string }
  | { name: "department"; value: ("IT" | "EOD" | "AFD" | "RIM" | "EMU" | "")[] }
  | { name: "visibility"; value: "public" | "private" | "" }
  | { name: "participants"; value: SignupState[] }
  | { name: "submitted"; value: true | false }
  | { name: "cover_image_upload"; value: File | null }
  | { name: "cover_image_url"; value: string };

const CourseDataSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {
    setCourseData: (_, action: PayloadAction<CourseData>) => action.payload,
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { name, value } = action.payload;
      (state[name] as typeof value) = value;
    },
    resetCourseData: () => initialState,
  },
});

export const { updateField, resetCourseData, setCourseData } =
  CourseDataSlice.actions;
export default CourseDataSlice.reducer;
