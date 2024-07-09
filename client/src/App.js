
import React from 'react';
import { Component } from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Auth/Login';
import Signup from "./Auth/Signup"
import Navbar from './Components/Navbar';
class App extends Component {
 render(){
  return (
    <>
      <BrowserRouter>
    
    <Routes>
 
     <Route path='/' exact element={<Navbar/>}  />
     <Route path='/Signup' exact element={<Signup/>}  />

     </Routes>
     
    </BrowserRouter>
    </>
      

    
  )
 }
  
}

export default App;
