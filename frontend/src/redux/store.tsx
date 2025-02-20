import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserRedux'
import OverviewDataReducer from './CourseDataRedux'
import storage from "redux-persist/lib/storage";
import{ persistReducer, persistStore} from "redux-persist";
import { combineReducers }from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'overviewData']
}

const rootReducer = combineReducers({
  user: UserReducer,
  courseData: OverviewDataReducer
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
