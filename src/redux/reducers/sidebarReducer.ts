
import { SidebarActions, TOGGLE_SIDEBAR } from "../actions/action";

interface SidebarState{
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false
}

const sidebarReducer = (state = initialState, action: SidebarActions) => {
  switch(action.type){
    case TOGGLE_SIDEBAR: 
    return{
      ...state,
      isOpen: !state.isOpen
    };
    default: 
    return state
  }
}

export default sidebarReducer
  