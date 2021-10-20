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
function addUser(){

}

export const datatableActions = {
  getUsers,
};