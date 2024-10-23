import { IUser } from "../../interfaces/IUser";
import { UserAction, USERS } from "../actions/action";

interface UserState{
    user: IUser | null
  }
  
  const initialState: UserState = {
    user: null
  }
  
  const usersReducer = (state = initialState, action: UserAction) => {
    switch(action.type){
      case USERS:
      return{
        ...state,
        user: action.payload 
      };
      default: 
      return state
    }
  }
  
  export default usersReducer