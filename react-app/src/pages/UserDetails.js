import React from "react";
import User from "../components/User";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import UserInfoComponent from "../components/UserInfoComponent";
function UserDetails() {
  const {id} = useParams();
  const [user,setUser] = useState(null);

  useEffect(() => {
  axios.get(`User/${id}`)
  .then(res=>setUser(res.data))
  .catch(err=>console.log(err));
  }, [id])
  if(user)
  {
     return (
    <User>
      <div className="auth-inner">
        <UserInfoComponent user={user}/>
      </div>
    </User>
  );
  }
  else return (<div><CircularProgress size={120} /></div>);
}
export default UserDetails;
