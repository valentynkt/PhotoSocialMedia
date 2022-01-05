import React from "react";
import Admin from "../components/Admin";
import IconButton from "@material-ui/core/IconButton";
import { Edit,ClearOutlined,AccountBox,PhotoLibrary } from "@material-ui/icons";
import { useState,useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const AdminPannel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get("User");
    const data = await response.data;
    setUsers(data);
};

useEffect(() => {
(async () => {
  await fetchData();
  console.log("In useEffect: "+users);
  setLoading(false);
})()

return () => {
    console.log("Returned: "+users);
}
}, [])
if (loading) return <CircularProgress size={120} />;
else
  return (
    <Admin>
      <div className="auth-inner">
        <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-xs-5">
              <h2>
                User <b>Management</b>
              </h2>
            </div>
            <div className="col-xs-7">
              <a href="#" className="btn btn-primary">
                <i className="material-icons">&#xE147;</i> <span>Add New User</span>
              </a>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          {users.map((user)=>(
          <tbody>
          <tr>
            <td>{user.id}</td>
            <td>
              <a href="#">{user.firstName + " " + user.secondName}</a>
            </td>
            <td>{user.registerDate}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            <IconButton color="primary">
      <Edit />
    </IconButton>
    <IconButton color="secondary">
      <ClearOutlined />
    </IconButton>
    <IconButton color="primary">
      <AccountBox />
    </IconButton>
    <IconButton color="primary">
      <PhotoLibrary />
    </IconButton>
            </td>
          </tr>
        </tbody>
  ))}
         

        </table>
        </div>
      </div>
    </Admin>
  );
};
export default AdminPannel;
