import { TreatmentAction, TREATMENTS } from "../actions/action";

interface TreatmentState{
    treatments: ITreatment[];
    treatment: ITreatment | null;
  }
  

  const initialState: TreatmentState = {
    treatments: [],
    treatment: null
  }
  
  const treatmentsReducer = (state = initialState, action: TreatmentAction) => {
    switch(action.type){
      case TREATMENTS: 
      return{
        ...state,
        treatments: action.payload,
      };
      
      default: 
      return state
    }
  }
  
  export default treatmentsReducer