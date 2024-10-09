import { ADD_CLIENT, ClientAction, CLIENTS, NewClientAction } from "../actions/action";

interface ClientState{
    clients: IUser[];
    client: INewUser | null;
  }
  

  const initialState: ClientState = {
    clients: [],
    client: null
  }
  
  const clientsReducer = (state = initialState, action: ClientAction | NewClientAction) => {
    switch(action.type){
      case CLIENTS: 
      return{
        ...state,
        clients: action.payload,
      };
      case ADD_CLIENT:
        return {
            ...state, 
            client: action.payload
        }
      default: 
      return state
    }
  }
  
  export default clientsReducer
    