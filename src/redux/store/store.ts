import { combineReducers, configureStore} from '@reduxjs/toolkit';
import sidebarReducer from "../reducers/sidebarReducer"
import clientsReducer from "../reducers/clientsReducer"
import { useDispatch, useSelector, useStore } from 'react-redux';
import usersReducer from '../reducers/usersReducer';
import treatmentsReducer from '../reducers/treatmentsReducer';


const rootReduceer = combineReducers({
  sidebar: sidebarReducer,
  clientsList: clientsReducer,
  users: usersReducer,
  treatments: treatmentsReducer
})

const store = configureStore({
  reducer: rootReduceer
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()


