
import { INewUser, IUser } from "../../interfaces/IUser";
import { ADD_CLIENT,  CLIENT, ClientAction, ClientMeAction, CLIENTS, NewClientAction } from "../actions/action";

interface ClientState{
    clients: IUser[];
    client: INewUser | null;
    clientMe: INewUser | null;
  }
  

  const initialState: ClientState = {
    clients: [],
    client: null,
    clientMe: null,
  }
  
  const clientsReducer = (state = initialState, action: ClientAction | NewClientAction | ClientMeAction ) => {
    switch(action.type){
      case CLIENTS: 
      return{
        ...state,
        clients: action.payload,
      };
      case CLIENT: 
      return{
        ...state,
        clientMe: action.payload,
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
    