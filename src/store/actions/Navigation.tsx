import { endPoint } from '../../config/Config';
import { Dispatch } from 'redux';
import axios from 'axios' 
  import { actionState } from '../reducers/NavReducer';
 import  {actionType} from  '../reducers/NavReducer';

 

export const doGetNavigation :any= (  setShowMainLoader:React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch:Dispatch<actionType>) => {
    try { 
        
        
const accessToken:any = localStorage.getItem("access_token")
        const api = `${endPoint}api/navigation`; 
        const token:string=  `Bearer ${JSON.parse(accessToken).access_token}` 
      const data =await  axios.get(api , { headers: {"Authorization" : token} }).then(res => {
     
        setShowMainLoader(false);
          return res.data ;
        }) 
        .catch((error) => {
            console.log(error)
        });
  
      await  dispatch({
            type: actionState.GET_NAV,
            payload: data,
        })
       
    }
    catch (error) {
        // alert(error?.response?.data?.message)
    }
}
