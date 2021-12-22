import React from "react";
import { Component } from "react";
import { Home } from "./Home";
import { Table } from "react-bootstrap";
export class User extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'comments')
        .then(responce=>responce.json())
        .then(data => {
            this.setState({deps:data});
        })
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    render(){
        const {deps}=this.state;
        return(
            <div className="mt-5 d-flex justify-content-left">
             <Table>
                 <thead>
                     <tr>
                         <th>
                             Id
                         </th>
                         <th>
                            Text
                         </th>
                     </tr>
                 </thead>
                 <tbody>
                     {deps.map(dep =>
                     <tr key={dep.Id}>
                       <td>{dep.Id}</td>
                       <td>{dep.texts}</td>
                     </tr>
                     )    }
                 </tbody>
             </Table>
            </div>
        )
    }
}