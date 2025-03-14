import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import{ persistReducer, persistStore} from "redux-persist";
import { combineReducers }from 'redux'

import UserReducer from './UserRedux'
import OverviewDataReducer from './CourseDataRedux'
import TraineesAccountsReducer from "./TraineesAccountsRedux";
import ExternalTrainingDataReducer from './ExternalTrainingDataRedux'
import CourseContentDataReducer from "./CourseContentDataRedux";
import CourseIDReducer from './CourseIDRedux'
import ModuleDataReducer from './ModuleDataRedux'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'overviewData, trainees', 'courseContent', 'courseID', 'moduleData']
}

const rootReducer = combineReducers({
  user: UserReducer,
  courseData: OverviewDataReducer,
  trainees: TraineesAccountsReducer,
  externalTrainingData: ExternalTrainingDataReducer,
  courseContent: CourseContentDataReducer,
  courseID: CourseIDReducer,
  moduleData: ModuleDataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
