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
import LoginPage from './components/LoginPage/LoginPage';
import ManageFarmPage from './components/ManageFarmPage/ManageFarmPage';
import {ToastContainer, toast, Zoom, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

let accessToken = "xxxeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4ZGRiNTasasE2ZC01MTdhLTQxYzItYjQ5OC05NTViZDMxNDlhZGMiLCJpYXQiOjE2MTQ3Mjk3MzIasasdsIm5iZiI6MTYxNDcyOTczMiwiZnJlc2giOmZhbHNlLCJzdWIiOiJhZG1pbiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE2MTQ3MzAwMzJ9.0pZ33ZPMUdu7OmvlnHNefvkrIDyxCNWP5jHp_pOu2OQ";

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)


const App = () => {
  
  



  return (
    <div>
      <> <ToastContainer draggable={false} transition={Zoom} autoClose={5000} preventDuplicates/> </>
    
    <div>
      <Navbar />
      <div className="content" >
        <Switch>
          <Route path="/farms/:id" component={ManageFarmPage} />
          <Route path="/admin/manageUsers/:id" exact component={(props) => <EditUserPage {...props}/>} />
          <Route path="/admin/manageUsers" component={ManageUsersPage} />
          <Route path="/admin/addUser" component={SignupPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/farms" component={FarmsPage} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/login" component={(props) => <LoginPage {...props} />} />
          <Route path="/home" exact component={HomePage} />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    
    
    </div>
    </div>
    );

}

export default App;
