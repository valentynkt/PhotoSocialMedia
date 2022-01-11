import React from 'react';
import Admin from "../components/Admin";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import EditUserComponent from '../components/EditUserComponent';
const AdminEditUser = () => {
    const {id} = useParams();
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError]=useState("");

      
    const handleChangeFunc = (event) => {
        const { name, value } = event.target;
    
        setUser((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };
    

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
            <EditUserComponent user={user}/>
          </div>
        </Admin>
      );
      }
      else return (<div><CircularProgress size={120} /></div>);
};

export default AdminEditUser;