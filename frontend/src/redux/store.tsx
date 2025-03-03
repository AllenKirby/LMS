import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import{ persistReducer, persistStore} from "redux-persist";
import { combineReducers }from 'redux'

import UserReducer from './UserRedux'
import OverviewDataReducer from './CourseDataRedux'
import TraineesAccountsReducer from "./TraineesAccountsRedux";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'overviewData, trainees']
}

const rootReducer = combineReducers({
  user: UserReducer,
  courseData: OverviewDataReducer,
  trainees: TraineesAccountsReducer
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
