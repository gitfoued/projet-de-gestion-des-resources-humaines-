
import React from 'react';
import { Component } from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Auth/Login';
import Signup from "./Auth/Signup"
import Dashboardpage from './Pages/Dashboardpage';
import EmployeePage from './Pages/EmployeePage';
import EmployeeDetails from './Components/Employee/EmployeeDetails';
import AddEmployee from './Components/Employee/AddEmployee';
import EditPage from './Components/Employee/EditPage';
import DepartmentPage from './Pages/DepartmentPage';
import DepartmentDetails from './Components/Department/DepartmentDetails';
import AddDepartmentPage from './Components/Department/AddDepartmentPage';
import EditDepartmentPage from './Components/Department/EditDepartmentPage';
class App extends Component {
 render(){
  return (
    <>
      <BrowserRouter>
    
    <Routes>
     <Route path='/' exact element={<Login/> }  />
     <Route path="/employee/:id" element={<EmployeeDetails />} />
     <Route path="/ajouter" element={<AddEmployee />} />
     <Route path="/modifier/:id" element={<EditPage/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Dashboardpage" element={<Dashboardpage/>} />
     <Route path="/employees" element={<EmployeePage/>} />
     <Route path="/departments" element={<DepartmentPage/>} />
     <Route path="/department/:id" element={<DepartmentDetails/>} />
     <Route path="/ajouterdepartment" element={<AddDepartmentPage/>} />
     <Route path="/modifierdepartment/:id" element={<EditDepartmentPage/>} />
     </Routes>
    </BrowserRouter>
    </>
  )
 }
  
}

export default App;
