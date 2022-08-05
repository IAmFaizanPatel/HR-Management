import { START_LOADING, END_LOADING, CREATEBRANCH, UPDATEBRANCH, FETCH_BY_SEARCH_BRANCHES, FETCH_BRANCH, FETCH_ALL_BRANCHES, LIKE } from '../constants/actionTypes';

export default (state = { isLoading: true, branches: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_BRANCHES:
      return {
        ...state,
        branches: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH_BRANCHES:
      return { ...state, branches: action.payload.data };
    case FETCH_BRANCH:
      return { ...state, branch: action.payload.branch };
    case CREATEBRANCH:
      return { ...state, branches: [...state.branches, action.payload] };
    case UPDATEBRANCH:
      return { ...state, branches: state.branches.map((branch) => (branch._id === action.payload._id ? action.payload : branch)) };
    case LIKE:
      return { ...state, branches: state.branches.map((branch) => (branch._id === action.payload._id ? action.payload : branch)) };
    default:
      return state;
  }
}