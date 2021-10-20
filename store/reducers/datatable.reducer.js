import { datatableTypes } from '../types/datatable.types';


// DATATABLE REDUCER
export function datatableReducer(state = {}, action){
  console.log('state', state);
  switch (action.type){
    case datatableTypes.GET_REQUEST:
      return {
        loading: true
      };
    case datatableTypes.GET_SUCCESS:
      return Object.assign({}, state, {
        payload: action.users
      });
    case datatableTypes.GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}