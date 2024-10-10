import { combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import sidebarReducer from "../reducers/sidebarReducer"
import clientsReducer from "../reducers/clientsReducer"
import { useDispatch, useSelector, useStore } from 'react-redux';
import usersReducer from '../reducers/usersReducer';
import treatmentsReducer from '../reducers/treatmentsReducer';
import staffSlice from "../slices/staffSlice"
import orariSlice from "../slices/orariSlice"


const rootReducer = combineReducers({
  sidebar: sidebarReducer as Reducer,
  clientsList: clientsReducer as Reducer,
  users: usersReducer as Reducer,
  treatments: treatmentsReducer as Reducer, 
  staffList: staffSlice, 
  orari: orariSlice
})

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()


