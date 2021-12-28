import React from "react";
import { Navigate } from "react-router-dom";
const Main=()=>{
let user=JSON.parse(localStorage.getItem('user'));
if (user) {
    return <Navigate to={'/user'}/>
}
else return <Navigate to={'/guest'}/>
}
export default Main;