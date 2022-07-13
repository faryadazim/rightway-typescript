interface intitialType {
    data:{
    LoginName: string,
    RoleName: string,
    navigationResult: object[]
    userName: string}}

const initialState:intitialType ={
    data:{
    LoginName: "",
    RoleName: "",
    navigationResult: [],
    userName:""}};





export enum actionState{
    GET_NAV="GET_NAV"
}

export interface actionType {
    type:actionState.GET_NAV;
    payload?:string[]
}

const NavReducer = (state:intitialType = initialState, action:actionType) => {
    switch (action.type) {

        case actionState.GET_NAV : {
            return {
                data: action.payload
            }
        }
        default:
            return state;
    }
}

export default NavReducer;