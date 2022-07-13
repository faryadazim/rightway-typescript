import { NavStateManage } from "../constants/actionTypes";

export interface actionTypeNavState {
  type:NavStateManage; 
}

 const  navFunc= (NavState = true, action:actionTypeNavState) => {
  switch (action.type) {
    case NavStateManage.ShowNavTrue:
      return true;
    case  NavStateManage.ShowNavFalse:
      return false;
    default:
      return NavState;
  }
};

export default navFunc;