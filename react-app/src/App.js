import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { render } from '@testing-library/react';
import { User } from './User';
import { Home } from './Home';
import { Navigation } from './navigation';

import {BrowserRouter,Route,Routes} from 'react-router-dom';

const api=axios.create({
  baseURL:`https://localhost:44371/api/`
})
class App extends Component{
  constructor(){
    super();
    api.get('Comments/').then(res=>{
      console.log(res.data)
    })
  }
  render() {
    return (
    <BrowserRouter>
    <div className='container'>
      <Navigation/>
      <Routes>
        <Route path='/'  element={<Home/>} exact/>
        <Route path='/user'  element={<User/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    );
  }
}


export default App;
