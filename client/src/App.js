
import React from 'react';
import { Component } from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Auth/Login';
import Signup from "./Auth/Signup"
import Dashboardpage from './Pages/Dashboardpage';
import EmployeePage from './Pages/EmployeePage';
import EmployeeDetails from './Components/EmployeeDetails';
import AddEmployee from './Components/AddEmployee';
class App extends Component {
 render(){
  return (
    <>
      <BrowserRouter>
    
    <Routes>
 
     <Route path='/' exact element={<Login/> }  />
     <Route path="/employee/:id" element={<EmployeeDetails />} />
     <Route path="/ajouter" element={<AddEmployee />} />
     <Route path="/modifier" element={<EmployeeDetails />} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Dashboardpage" element={<Dashboardpage/>} />
     <Route path="/employees" element={<EmployeePage/>} />
     
     </Routes>
     
    </BrowserRouter>
    </>
      

    
  )
 }
  
}

export default App;
