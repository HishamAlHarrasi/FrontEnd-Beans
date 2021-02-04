import './App.css';
import SignupPage from "./components/NewUserPage/SignupPage"
import { Switch, Redirect, Route } from "react-router-dom" 
import Navbar from './components/Navbar';
import HomePage from './components/HomePage/HomePage.jsx/HomePage';
import NotFound from './components/NotFoundPage/NotFound';
import AdminPage from './components/AdminPage/AdminPage';
import FarmsPage from './components/FarmsPage/FarmsPage';
import ManageUsersPage from './components/ManageUsersPage/ManageUsersPage';
import EditUserPage from './components/EditUserPage/EditUserPage';

function App() {
  return (
    <div>
      <Navbar />
      <div className="content" >
        <Switch>
          <Route path="/admin/manageUsers/:id" exact component={(props) => <EditUserPage {...props}/>} />
          <Route path="/admin/manageUsers" component={ManageUsersPage} />
          <Route path="/admin/addUser" component={SignupPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/farms" component={FarmsPage} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    
    
    </div>
    );

}

export default App;
