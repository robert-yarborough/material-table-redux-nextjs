import { combineReducers } from "redux";
import { datatableReducer } from "./datatable.reducer";


const reducers = {
  datatable: datatableReducer,
}


export default combineReducers(reducers);