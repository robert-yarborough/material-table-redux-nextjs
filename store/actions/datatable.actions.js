import { datatableTypes } from "../types/datatable.types";
import config from '../../_service/config';


// GET
function getUsers(){
  return (dispatch) => {
    dispatch(request());
    config.mockAPI.get(`/users`).then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() { return { type: datatableTypes.GET_REQUEST }}
  function success(users) { return { type: datatableTypes.GET_SUCCESS, users }}
  function failure(error) { return { type: datatableTypes.GET_FAILURE, error }}
}

// POST
function addUser(newData, resolve){
  return (dispatch) => {
    dispatch(request());
    config.mockAPI.post(`/users`, newData).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString())),
       resolve()
    );
  };

  function request() { return { type: datatableTypes.POST_REQUEST }}
  function success(user) { return { type: datatableTypes.POST_SUCCESS, user}}
  function failure(error) { return { type: datatableTypes.POST_FAILURE, error }}
}


export const datatableActions = {
  getUsers,
  addUser
};