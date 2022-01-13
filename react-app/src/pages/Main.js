import React from "react";
import { Navigate } from "react-router-dom";
const Main=()=>{
let user=JSON.parse(localStorage.getItem('user'));
if (user && user.role==="user") {
    return <Navigate to={'/user'}/>
}
else if(user && user.role==="admin"){
    return <Navigate to={'/admin'}/>
}
else return <Navigate to={'/guest'}/>
}
export default Main;