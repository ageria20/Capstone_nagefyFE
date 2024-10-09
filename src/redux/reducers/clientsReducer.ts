import { ClientAction, CLIENTS } from "../actions/action";

interface ClientState{
    clients: IUser[]
  }
  

  const initialState: ClientState = {
    clients: []
  }
  
  const clientsReducer = (state = initialState, action: ClientAction) => {
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
  
  export default clientsReducer
    