import { START_LOADING, END_LOADING, FETCH_BRANCH_DATA, FETCH_EMPLOYEE_DATA} from '../constants/actionTypes';

export default (state = { isLoading: true, allBranches: [], allEmployees: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_BRANCH_DATA:
        return {  ...state, allBranches: action.payload.data };
    case FETCH_EMPLOYEE_DATA:
        return {  ...state, allEmployees: action.payload.data };    
    default:
      return state;
  }
}