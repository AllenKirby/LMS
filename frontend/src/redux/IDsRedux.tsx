import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDsState } from '../types/CourseCreationTypes'

const initialState: IDsState = {
    moduleID: null,
    menuID: null,
};

const IDsSlice = createSlice({
    name: 'IDs',
    initialState,
    reducers: {
        setModuleID(state, action: PayloadAction<string | number>) {
            state.moduleID = action.payload;
        },
        setMenuID(state, action: PayloadAction<number>) {
            state.menuID = action.payload;
        },
        resetIDs(state) {
            state.moduleID = null;
            state.menuID = null;
        },
    },
});

export const { setModuleID, setMenuID, resetIDs } = IDsSlice.actions;

export default IDsSlice.reducer;