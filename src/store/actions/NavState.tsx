import { Dispatch } from "redux";
import { actionTypeNavState } from "../reducers/NavState";
import { NavStateManage } from "../constants/actionTypes";
export const setNavSm:any = () => async (dispatch:Dispatch<actionTypeNavState>) => {
  try {
    dispatch({ type: NavStateManage.ShowNavFalse });
  } catch (error:any) {
    console.log(error.message);
  }
};

export const setNavMd:any = () => async (dispatch:Dispatch<actionTypeNavState>) => {
  try {
    dispatch({ type: NavStateManage.ShowNavTrue });
  } catch (error:any) {
    console.log(error.message);
  }
};



 

 