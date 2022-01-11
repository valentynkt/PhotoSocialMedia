import React from "react";
import Admin from "../components/Admin";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
function AdminUserInfo() {
  const {id} = useParams();
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState("");
  useEffect(() => {
    setLoading(true)
  axios.get(`User/${id}`)
  .then(res=>setUser(res.data))
  .catch(err=>setError(err));
  setLoading(false)
  }, [id])
  if(user)
  {
    console.log("USER"+user);
     return (
    <Admin>
      <div className="auth-inner">
        <div className="row profile">
          <div className="profile-usertitle">
            <h1 className="profile-usertitle-name">
              {user.firstName + " " + user.secondName}
            </h1>
          </div>
          <div className="about">
            <h5>About</h5>
            <p>{user.about}</p>
          </div>
          <h4>Profile Info</h4>
          <table className="table table-user-information">
            <tbody>
              <tr>
                <td>Date of Registration</td>
                <td>{user.registerDate}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <a href={"mailto:" + user.email}>{user.email}</a>
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
  }
  else return (<div><CircularProgress size={120} /></div>);
}
export default AdminUserInfo;
