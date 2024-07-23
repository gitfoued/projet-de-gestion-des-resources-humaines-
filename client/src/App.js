
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
import RolesPage from './Pages/RolesPage';
import RoleDetails from './Components/Roles/RoleDetails';
import AddRolePage from './Components/Roles/AddRolePage';
import EditRolePage from './Components/Roles/EditRolePage';
import Logout from './Auth/Logout';
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
     <Route path="/roles" element={<RolesPage/>} />
     <Route path="/role/:id" element={<RoleDetails/>} />
     <Route path="/ajouterrole" element={<AddRolePage/>} />
     <Route path="/modifierrole/:id" element={<EditRolePage/>} />
     <Route path="/logout" element={<Logout/>} />
     </Routes>
    </BrowserRouter>
    </>
  )
 }
  
}

export default App;
