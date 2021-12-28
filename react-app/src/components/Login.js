import axios from "axios";
import React,{useState,} from "react";
import {Navigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Guest from "./Guest";
export default function Login(props) {
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [redirect,setRedirect] =useState(false);
     const handleLogin=async (e)=>{
      e.preventDefault();
      setError(null);
      setLoading(true);
       try {
         const response= await axios.post("User/signin",{Email : email,Password: password});
         setLoading(false);
         localStorage.setItem('token',response.data.token);
         localStorage.setItem('user',JSON.stringify(response.data));
         setRedirect(true);
        console.log("response >>>",response);
       } catch (err) {
        setLoading(false);
        if (err.response.status === 401 || err.response.status === 400) {
          setError(err.response.data.message);
        }
        else{
          setError("something went wrong. Please try again");
        }
        console.log("error >>>",err);
       }
     };
     if (redirect) {
      return <Navigate to={'/user'}/>
    }
    return(
<Guest>
<div className="auth-inner">
<form onSubmit={handleLogin}> 
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
        {error && <Alert severity="error">{error}</Alert>}
        <input type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}  value={loading?"Loading...":"Login"}/>
    </form>
    </div>
</Guest>
    )
}
