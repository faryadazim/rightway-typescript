import React from 'react';
import { Route, Navigate } from 'react-router-dom'; 
 
 
const PrivateRoute:React.FC <any> = ({ children , pagePermission }) => {
   return    pagePermission.viewPermission==='true' ? children: <Navigate to="/" />   
}

export default PrivateRoute



 