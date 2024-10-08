import { ClientAction, CLIENTS } from "../actions/action";


  const initialState = {
    clients: []
  }
  
  const sidebarReducer = (state = initialState, action: ClientAction) => {
    switch(action.type){
      case CLIENTS: 
      return{
        ...state,
        clients: action.payload,
      };
      default: 
      return state
    }
  }
  
  export default sidebarReducer
    