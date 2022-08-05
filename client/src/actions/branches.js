import { START_LOADING, END_LOADING, CREATEBRANCH, UPDATEBRANCH, FETCH_BY_SEARCH_BRANCHES, FETCH_BRANCH, FETCH_ALL_BRANCHES, FETCH_BRANCH_DATA, LIKE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getBranch = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBranch(id);

    dispatch({ type: FETCH_BRANCH, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getBranches = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchBranches(page);

    dispatch({ type: FETCH_ALL_BRANCHES, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBranches = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchBranchData();
    dispatch({ type: FETCH_BRANCH_DATA, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
} 

export const getBranchesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchBranchesBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH_BRANCHES, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createBranch = (branch, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createBranch(branch);

    dispatch({ type: CREATEBRANCH, payload: data });

    history.push(`/branches`);
  } catch (error) {
    console.log(error);
  }
};

export const updateBranch = (id, branch) => async (dispatch) => {
  try {
    const { data } = await api.updateBranch(id, branch);

    dispatch({ type: UPDATEBRANCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeBranch = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeBranch(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};