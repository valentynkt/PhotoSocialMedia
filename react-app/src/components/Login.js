import axios from "axios";
import React,{Component} from "react";
import {Navigate} from 'react-router-dom'
export default class Login extends Component{
  state={};
    handleSubmit=e=>{
        e.preventDefault();
        const data = {
            Email : this.email,
            Password : this.password
        };
        axios.post("User/signin",data).then((res) => {
            console.log(res);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',res.data);
            this.setState({
              loggedIn:true
            });
            this.props.setUser(res.data);
          }).catch(
            err=>{
              console.log(err.data);
            }
          );
    };
    render(){
      if (this.state.loggedIn) {
        return <Navigate to={'/'}/>
      }
        return(
            <form onSubmit={this.handleSubmit}> 
            <h3>
Login
            </h3>

            <div className="form-group">
               <label>Email</label>
               <input type="email" className="form-control" 
               placeholder="Email" onChange={e=>this.email = e.target.value}/>
            </div>

            <div className="form-group">
               <label>Password</label>
               <input type="password" className="form-control" 
               placeholder="Password" onChange={e=>this.password = e.target.value}/>
            </div>
            <button className="btn btn-primary btn-block btn-lg">Login</button>
        </form>
        )
    }
}