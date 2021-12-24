import axios from "axios";
import React,{Component,useState,useContext} from "react";
import {Navigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { UserContext } from "../utils/UserContext";

export default function Login() {
  const {setUser} = useContext(UserContext);
  const [error,setError] = useState("Invalid password");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
     const handleLogin=()=>{
       setError(null);
       setLoading(true);
      axios.post("User/signin",{Email : email,Password: password})
      .then(response => {
        setLoading(false);
        setUser(response.data);
       //this.props.history.push('/');
        console.log("response >>>",response);
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 401 || err.response.status === 400) {
          setError(err.response.data.message);
        }
        else{
          setError("something went wrong. Please try again");
        }
        console.log("error >>>",err);
      })
     }
    return(
        <form> 
        <h3>
        Login
        </h3>

        <div className="form-group">
           <label>Email</label>
           <input type="email" className="form-control" 
           placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
           <label>Password</label>
           <input type="password" className="form-control" 
           placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        {error && <Alert severity="error">This is an error alert — check it out!</Alert>}
        <button className="btn btn-primary btn-block btn-lg" disabled={loading} onClick={handleLogin()}>{loading?"Loading...":"Login"}</button>
    </form>
    )
}
