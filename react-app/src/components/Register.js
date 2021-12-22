import React,{Component} from "react";
import axios from "axios";
const api = axios.create({
  baseURL: `https://localhost:44371/api/`,
});
export default class Register extends Component{
    handleSubmit=e=>{
        e.preventDefault();
        const data = {
            FirstName : this.firstName,
            SecondName : this.lastName,
            Email : this.email,
            Password : this.password
        };
        api.post("User/signup",data).then((res) => {
            console.log(res.data);
          }).catch(
            err=>{
              console.log(err.data);
            }
          );
        console.log(data);
    };
    render(){
        return(
            <form onSubmit={this.handleSubmit}> 
                <h3>

                </h3>

                <div className="form-group">
                   <label>First Name</label>
                   <input type="text" className="form-control" 
                   placeholder="First Name" onChange={e=>this.firstName = e.target.value}/>
                </div>

                <div className="form-group">
                   <label>Last Name</label>
                   <input type="text" className="form-control" 
                   placeholder="Last Name" onChange={e=>this.lastName = e.target.value}/>
                </div>

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
                <button className="btn btn-primary btn-block btn-lg">Sign Up</button>
            </form>
        )
    }
}