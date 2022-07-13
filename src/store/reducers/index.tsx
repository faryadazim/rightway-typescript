import { combineReducers } from "redux";

import NavState from "./NavState"; 
import NavReducer from './NavReducer'
import { type } from "@testing-library/user-event/dist/type";


export const reducers = combineReducers({ NavState  , NavReducer  });

export type State = ReturnType<typeof reducers>