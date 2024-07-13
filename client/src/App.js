
import React from 'react';
import { Component } from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Auth/Login';
import Signup from "./Auth/Signup"
import Navbar from './Components/Navbar';
import EmployeesList from './Components/EmployeesList';
import Dashboardpage from './Pages/Dashboardpage';
import EmployeeSearch from './Components/EmployeeSearch';
import EmployeePage from './Pages/EmployeePage';

class App extends Component {
 render(){
  return (
    <>
      <BrowserRouter>
    
    <Routes>
 
     <Route path='/' exact element={<EmployeePage/> }  />
     
     </Routes>
     
    </BrowserRouter>
    </>
      

    
  )
 }
  
}

export default App;
